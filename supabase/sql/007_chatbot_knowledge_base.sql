-- 007_chatbot_knowledge_base.sql
-- Knowledge Base for ATHANG IMPEX AI Assistant (+1 7111647464)

CREATE TABLE IF NOT EXISTS public.chatbot_knowledge (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Company Information',
    content TEXT NOT NULL,
    summary TEXT DEFAULT '',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for chatbot_knowledge updated_at
DROP TRIGGER IF EXISTS trigger_chatbot_knowledge_updated_at ON public.chatbot_knowledge;
CREATE TRIGGER trigger_chatbot_knowledge_updated_at
    BEFORE UPDATE ON public.chatbot_knowledge
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
