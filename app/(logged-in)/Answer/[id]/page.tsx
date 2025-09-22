// app/answer/[id]/page.tsx
/*
import { notFound } from "next/navigation";
import { getanswerById } from "@/components/answer/anwer";


export default async function AnswerPage(props:{params:Promise<{id:string}>}) {
  const params=await props.params;
  const id=params.id;
  const answer = await getanswerById(id);

  if (!answer) {
  console.log("not found ")
    return notFound();
  }
const{ title, filename, answerText, originalFileUrl}=answer;
  return (
  <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
    <div className="bg-[ #89d989];
background: linear-gradient(122deg, rgba(137, 217, 137, 1) 0%, rgba(237, 223, 223, 1) 100%);">
  <div className="container mx-auto flex flex-col gap-4"> 
<div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
<div className=" p-3 flex flex-col">
<h1>{title}</h1> {/*she has create a diffrent compoent for the title 
</div>
{filename && <p className="text-black text-lg ">{filename}</p>}
<div className="relative mt-4 sm:mt-8 lg:mt-16">
<div>
  {answerText}
</div>
</div>
</div>
  </div>
</div>
 
  </div>
  );
}
*/
import { notFound } from "next/navigation";
import { getanswerById } from "@/components/answer/anwer";
import { JSX } from "react";

// Helper function to format text
function formatAnswerText(text: string) {
  if (!text) return '';
  
  // Split by double newlines to create paragraphs
  return text
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0);
}

// Helper function to detect if text contains structured data
function parseStructuredContent(text: string) {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(text);
    return { type: 'json', content: parsed };
  } catch {
    // Check if it looks like markdown or has specific patterns
    if (text.includes('##') || text.includes('**') || text.includes('- ')) {
      return { type: 'markdown', content: text };
    }
    
    // Check if it has key-value pairs
    if (text.includes(':') && text.includes('\n')) {
      const lines = text.split('\n').filter(line => line.trim());
      const hasKeyValuePairs = lines.some(line => line.includes(':') && !line.startsWith(' '));
      if (hasKeyValuePairs) {
        return { type: 'structured', content: text };
      }
    }
    
    return { type: 'text', content: text };
  }
}

// Component to render JSON data beautifully
function JsonDisplay({ data }: { data: any }) {
  const renderValue = (value: any, key?: string): JSX.Element => {
    if (value === null) return <span className="text-black">null</span>;
    if (value === undefined) return <span className="text-black">undefined</span>;
    
    if (typeof value === 'boolean') {
      return <span className="text-black font-medium">{value.toString()}</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="text-green-400 font-medium">{value}</span>;
    }
    
    if (typeof value === 'string') {
      return <span className="text-yellow-200">{value}</span>;
    }
    
    if (Array.isArray(value)) {
      return (
        <div className="ml-4">
          {value.map((item, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4 py-1">
              <span className="text-sm text-gray-500">[{index}]</span>
              <div className="ml-2">{renderValue(item)}</div>
            </div>
          ))}
        </div>
      );
    }
    
    if (typeof value === 'object') {
      return (
        <div className="ml-4 space-y-2">
          {Object.entries(value).map(([objKey, objValue]) => (
            <div key={objKey} className="border-l-2 border-blue-100 pl-4">
              <span className="font-semibold text-green-900">{objKey}:</span>
              <div className="ml-2">{renderValue(objValue, objKey)}</div>
            </div>
          ))}
        </div>
      );
    }
    
    return <span>{String(value)}</span>;
  };

  return (
    <div className="bg-white p-4 rounded-lg font-mono text-sm">
      {renderValue(data)}
    </div>
  );
}

// Component to render markdown-like content
function MarkdownDisplay({ text }: { text: string }) {
  const formatMarkdown = (text: string) => {
    return text
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-black">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-black">$1</h3>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${formatMarkdown(text)}</p>` }}
    />
  );
}

// Component to render structured key-value content
function StructuredDisplay({ text }: { text: string }) {
  const lines = text.split('\n').filter(line => line.trim());
  
  return (
    <div className="space-y-3">
      {lines.map((line, index) => {
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-black sm:w-1/3 sm:min-w-0">
                {key.trim()}:
              </div>
              <div className="text-gray-800 sm:w-2/3 flex-1">
                {value}
              </div>
            </div>
          );
        }
        
        return (
          <div key={index} className="p-3 bg-green-200 rounded-lg">
            <p className="text-gray-800">{line}</p>
          </div>
        );
      })}
    </div>
  );
}

export default async function AnswerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const answer = await getanswerById(id);

  if (!answer) {
    console.log("not found");
    return notFound();
  }

  const { title, filename, answerText, originalFileUrl, createdAt } = answer;
  
  // Parse the content to determine how to display it
  const parsedContent = parseStructuredContent(answerText || '');
  const paragraphs = formatAnswerText(answerText || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {title || "Untitled Answer"}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {filename && (
              <div className="flex items-center gap-2">
                <span className="font-medium">File:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{filename}</span>
              </div>
            )}
            
            {createdAt && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Created:</span>
                <span>{new Date(createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            )}
            
            {originalFileUrl && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Source:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {originalFileUrl.split('/').pop()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Answer Content</h2>
          </div>
          
          {parsedContent.type === 'json' && (
            <JsonDisplay data={parsedContent.content} />
          )}
          
          {parsedContent.type === 'markdown' && (
            <MarkdownDisplay text={parsedContent.content} />
          )}
          
          {parsedContent.type === 'structured' && (
            <StructuredDisplay text={parsedContent.content} />
          )}
          
          {parsedContent.type === 'text' && paragraphs.length > 0 && (
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {!answerText && (
            <div className="text-center py-8 text-gray-500">
              <p>No content available</p>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="mt-6 flex justify-center">
          <a 
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-amber-50 transition-colors shadow-md"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}