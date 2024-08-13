import { transform } from '@babel/standalone';
import type { PluginObj } from '@babel/core'
import Editor from './Editor';

function App() {

  const code1 = `
  function add(a, b) {
    return a + b;
  }
  export { add };
  `;

  const url = URL.createObjectURL(new Blob([code1], { type: 'application/javascript' }));

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    }
  }

  const code = `import { add } from './add.ts'; console.log(add(1, 2));`;

  function onClick() {
    const res = transform(code, {
      presets: ['react', 'typescript'],
      filename: 'file.ts',
      plugins: [transformImportSourcePlugin],
    });

    console.log(res.code)
  }

  return <>
  <Editor />
  <button onClick={onClick}>编译</button>
  </>
}

export default App
