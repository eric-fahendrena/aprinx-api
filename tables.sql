-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    given_name VARCHAR(255),
    family_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    email_verified BOOLEAN,
    picture TEXT,
    phone_number VARCHAR(50),
    phone_number_associated_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'USER'
);

-- Table des cours
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    cover_photo TEXT,
    category VARCHAR(255),
    price NUMERIC,
    title VARCHAR(255),
    description TEXT,
    date BIGINT
);

-- Table des vidéos de cours
CREATE TABLE course_videos (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    title VARCHAR(255),
    description TEXT,
    access VARCHAR(50),
    url TEXT,
    thumbnail TEXT,
    date BIGINT
);

-- Table des commentaires de cours
CREATE TABLE course_comments (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    message TEXT,
    parent_id INTEGER,
    date BIGINT
);

-- Table des likes de cours
CREATE TABLE course_likes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    user_id INTEGER REFERENCES users(id),
    date BIGINT
);

-- Table des feedbacks
CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    message TEXT,
    date BIGINT
);

-- Table des notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    type VARCHAR(50),
    author_names TEXT,
    date BIGINT,
    last_update BIGINT,
    is_seen BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE
);

-- Table des notifications de commentaires
CREATE TABLE comment_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    author_names TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_seen BOOLEAN DEFAULT FALSE,
    date BIGINT,
    last_update BIGINT
);

-- Table des notifications de likes
CREATE TABLE like_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    author_names TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_seen BOOLEAN DEFAULT FALSE,
    date BIGINT,
    last_update BIGINT
);

-- Table des transactions de cours
CREATE TABLE course_transactions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    buyer_id INTEGER REFERENCES users(id),
    screenshot_url TEXT,
    status VARCHAR(50),
    date BIGINT
);

-- Table des transactions d'abonnement
CREATE TABLE subscription_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    screenshot_url TEXT,
    target_amount NUMERIC,
    status VARCHAR(50) DEFAULT 'PENDING',
    date BIGINT
);

-- Table des abonnements enseignants
CREATE TABLE teacher_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    date BIGINT,
    next_payment_amount NUMERIC
);

-- Table des accès utilisateur aux cours
CREATE TABLE user_course_access (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    user_id INTEGER REFERENCES users(id),
    date BIGINT
);

-- Table des notifications d'accès aux cours
CREATE TABLE course_access_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    author_names TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    date BIGINT,
    last_update BIGINT
);

-- Table des cours supprimés
CREATE TABLE deleted_courses (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    author_id INTEGER,
    price NUMERIC,
    cover_photo TEXT,
    created_at BIGINT,
    deleted_at BIGINT
);

-- Table des prochains paiements d'abonnement
CREATE TABLE subscription_next_payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount NUMERIC,
    date BIGINT,
    updated_at BIGINT
);