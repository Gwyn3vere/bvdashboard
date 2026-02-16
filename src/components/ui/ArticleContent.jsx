import React from "react";
import DOMPurify from "dompurify";

function ArticleContent({ html }) {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <div
      className="prose prose-lg mx-auto max-w-3xl"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

export default React.memo(ArticleContent);
