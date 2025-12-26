CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  project_url TEXT,
  github_url TEXT,
  technologies TEXT[] NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert sample projects
INSERT INTO projects (title, description, image_url, project_url, github_url, technologies, display_order) VALUES
  ('E-Commerce Platform', 'A full-stack e-commerce platform with payment integration, inventory management, and real-time order tracking.', 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop', 'https://example.com/ecommerce', 'https://github.com/username/ecommerce', ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'], 1),
  ('Task Management App', 'Collaborative task management application with real-time updates, team workspaces, and analytics dashboard.', 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&h=600&fit=crop', 'https://example.com/taskmanager', 'https://github.com/username/taskmanager', ARRAY['React', 'TypeScript', 'Firebase', 'Tailwind CSS'], 2),
  ('Weather Dashboard', 'Beautiful weather dashboard with 7-day forecasts, interactive maps, and location-based weather alerts.', 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop', 'https://example.com/weather', 'https://github.com/username/weather', ARRAY['React', 'TypeScript', 'OpenWeather API', 'Chart.js'], 3);

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, display_order) VALUES
  ('TypeScript', 'Frontend', 95, 1),
  ('React', 'Frontend', 90, 2),
  ('Tailwind CSS', 'Frontend', 85, 3),
  ('Node.js', 'Backend', 88, 4),
  ('PostgreSQL', 'Backend', 82, 5),
  ('REST APIs', 'Backend', 90, 6),
  ('Git', 'Tools', 85, 7),
  ('Docker', 'Tools', 75, 8);
