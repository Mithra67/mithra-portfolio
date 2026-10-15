CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role = 'owner'),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own portfolio role"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.assign_portfolio_owner_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'duraisamysangamithra19@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'owner')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER assign_portfolio_owner_role_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_portfolio_owner_role();
CREATE TRIGGER assign_portfolio_owner_role_on_confirmation
  AFTER UPDATE OF email, email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_portfolio_owner_role();

CREATE TABLE public.portfolio_content (
  id text PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.portfolio_content TO authenticated;
GRANT ALL ON public.portfolio_content TO service_role;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portfolio content is publicly readable"
  ON public.portfolio_content FOR SELECT TO anon, authenticated
  USING (id = 'main');
CREATE POLICY "Only the portfolio owner can add content"
  ON public.portfolio_content FOR INSERT TO authenticated
  WITH CHECK (id = 'main' AND public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Only the portfolio owner can edit content"
  ON public.portfolio_content FOR UPDATE TO authenticated
  USING (id = 'main' AND public.has_role(auth.uid(), 'owner'))
  WITH CHECK (id = 'main' AND public.has_role(auth.uid(), 'owner'));
CREATE POLICY "Only the portfolio owner can remove content"
  ON public.portfolio_content FOR DELETE TO authenticated
  USING (id = 'main' AND public.has_role(auth.uid(), 'owner'));

CREATE OR REPLACE FUNCTION public.touch_portfolio_content_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER touch_portfolio_content_updated_at
  BEFORE UPDATE ON public.portfolio_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_portfolio_content_updated_at();