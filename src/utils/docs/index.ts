export function extractCodeFromTagString(example: string): string {
  return example.match(/```ts\n([\s\S]+?)\n```/)?.[1] ?? ''
}
