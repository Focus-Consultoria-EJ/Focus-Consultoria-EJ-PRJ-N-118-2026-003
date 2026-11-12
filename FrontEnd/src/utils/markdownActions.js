// Cada "ação" recebe (texto, início, fim) e devolve { text, selStart, selEnd }.

export function wrap(before, after = before, placeholder = 'texto') {
  return (text, start, end) => {
    const selected = text.slice(start, end) || placeholder;
    const result = text.slice(0, start) + before + selected + after + text.slice(end);
    const selStart = start + before.length;
    return { text: result, selStart, selEnd: selStart + selected.length };
  };
}

export function linePrefix(prefixFor, own, strip = own) {
  return (text, start, end) => {
    const lineStart = start === 0 ? 0 : text.lastIndexOf('\n', start - 1) + 1;
    const blockEnd = end > start && text[end - 1] === '\n' ? end - 1 : end;
    const block = text.slice(lineStart, blockEnd);
    const lines = block.split('\n');
    const many = lines.length > 1;
    const targets = many ? lines.filter((line) => line.trim() !== '') : lines;
    const allHave = targets.length > 0 && targets.every((line) => own.test(line));

    let n = 0;
    const changed = lines.map((line) => {
      if (many && line.trim() === '') return line;
      const result = allHave ? line.replace(own, '') : prefixFor(n) + line.replace(strip, '');
      n += 1;
      return result;
    });

    const newBlock = changed.join('\n');
    const selStart = Math.max(lineStart, start + (changed[0].length - lines[0].length));
    const selEnd = Math.max(selStart, blockEnd + (newBlock.length - block.length));
    return { text: text.slice(0, lineStart) + newBlock + text.slice(blockEnd), selStart, selEnd };
  };
}

export function mdLink(lead, label) {
  return (text, start, end) => {
    const selected = text.slice(start, end) || label;
    const open = `${lead}[${selected}](`;
    const result = text.slice(0, start) + open + 'url)' + text.slice(end);
    const selStart = start + open.length;
    return { text: result, selStart, selEnd: selStart + 3 };
  };
}

export const actions = {
  h2: linePrefix(() => '## ', /^## /, /^#{1,6} /),
  h3: linePrefix(() => '### ', /^### /, /^#{1,6} /),
  bold: wrap('**'),
  italic: wrap('*'),
  ul: linePrefix(() => '- ', /^- /, /^(- |\d+\. )/),
  ol: linePrefix((i) => `${i + 1}. `, /^\d+\. /, /^(- |\d+\. )/),
  quote: linePrefix(() => '> ', /^> /),
  link: mdLink('', 'texto'),
  image: mdLink('!', 'legenda'),
};