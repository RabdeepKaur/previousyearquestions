-- First, create the extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User table (note: 'users' not 'user' - 'user' is a reserved word)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    full_name VARCHAR(255),
    customer_id VARCHAR(255) UNIQUE,
    price_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'inactive'
);

-- Sessions table
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    uploads_used INTEGER DEFAULT 0,
    max_uploads INTEGER DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    original_file_url TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'complete',
    title TEXT,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    upload_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments table (fixed spelling and syntax)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
    price_id VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL REFERENCES users(email),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function (fixed syntax)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Add triggers (fixed function names)
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();