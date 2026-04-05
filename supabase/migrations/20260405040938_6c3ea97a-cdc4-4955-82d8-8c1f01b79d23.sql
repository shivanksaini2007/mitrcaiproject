
-- Create event categories enum
CREATE TYPE public.event_category AS ENUM ('music', 'sports', 'education', 'technology', 'arts', 'food', 'community', 'other');

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  category event_category NOT NULL DEFAULT 'other',
  description TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Anyone can view events
CREATE POLICY "Anyone can view events" ON public.events
  FOR SELECT USING (true);

-- Authenticated users can create events
CREATE POLICY "Authenticated users can create events" ON public.events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Users can update their own events
CREATE POLICY "Users can update own events" ON public.events
  FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Users can delete their own events
CREATE POLICY "Users can delete own events" ON public.events
  FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

-- Seed some sample events
INSERT INTO public.events (title, date, location, category, description) VALUES
  ('Summer Music Festival', now() + interval '7 days', 'Central Park, NYC', 'music', 'Join us for an amazing outdoor music festival featuring local and international artists. Food trucks, art installations, and more!'),
  ('Community Basketball Tournament', now() + interval '14 days', 'Downtown Sports Center', 'sports', 'Annual 3v3 basketball tournament open to all skill levels. Prizes for top teams!'),
  ('Web Development Workshop', now() + interval '3 days', 'Tech Hub Coworking Space', 'technology', 'Learn modern web development with React and TypeScript. Beginner-friendly workshop with hands-on projects.'),
  ('Local Art Exhibition', now() + interval '10 days', 'City Art Gallery', 'arts', 'Showcasing works from 30+ local artists. Opening night reception with refreshments.'),
  ('Farmers Market Grand Opening', now() + interval '5 days', 'Town Square', 'food', 'Fresh produce, artisan goods, and live cooking demos. Support local farmers and makers!'),
  ('Neighborhood Cleanup Day', now() + interval '2 days', 'Meet at City Hall', 'community', 'Help beautify our neighborhood! Supplies provided. All ages welcome.'),
  ('Piano Recital Evening', now() + interval '21 days', 'Symphony Hall', 'music', 'Classical piano performances by award-winning students from the local conservatory.'),
  ('Youth Soccer Camp', now() + interval '30 days', 'Riverside Athletic Fields', 'sports', 'Week-long soccer camp for ages 8-16. Professional coaching and skill development.');
