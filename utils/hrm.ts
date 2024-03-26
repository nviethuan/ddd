declare const module: any;

export async function webpackHRMWrapper(bootstrap) {
  const app = await bootstrap();

  module?.hot?.accept();
  module?.hot?.dispose(() => app.close());
}
