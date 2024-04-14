import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js',

  output: {
    file: 'dist/umd/vue.js', // 输出文件
    name: 'Vue', // 指定模块全局变量名字
    format: 'umd',
    sourcemap: true, // 开启源代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.ENV == 'development'
      ? serve({
          open: true,
          openPage: '/public/index.html',
          port: 5000,
          contentBase: '',
        })
      : null,
  ],
};
