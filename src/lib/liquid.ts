import { Liquid } from 'liquidjs';
import path from 'path';

let engine: Liquid | null = null;

function getEngine(): Liquid {
  if (!engine) {
    engine = new Liquid({
      root: path.resolve(process.cwd(), 'src/templates'),
      extname: '.liquid',
      cache: process.env.NODE_ENV === 'production',
    });
  }
  return engine;
}

export async function renderTemplate(
  template: string,
  data: Record<string, unknown>
): Promise<string> {
  return getEngine().renderFile(template, data);
}

export async function renderTemplateString(
  templateStr: string,
  data: Record<string, unknown>
): Promise<string> {
  return getEngine().parseAndRender(templateStr, data);
}
