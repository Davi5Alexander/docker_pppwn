const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', // o 'production' o 'none', según lo que necesites
  entry: './src/js/scripts.js', // Punto de entrada de JavaScript
  output: {
    filename: 'scripts.js', // Nombre del archivo de salida JS
    path: path.resolve(__dirname, 'public') // Directorio de salida JS
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Aplica esta regla a archivos .scss
        use: [
          MiniCssExtractPlugin.loader, // Extrae el CSS a un archivo separado
          'css-loader', // Interpreta los archivos CSS
          'postcss-loader', // Aplica transformaciones CSS (Autoprefixer, etc.)
          'sass-loader' // Compila Sass a CSS
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Aplica esta regla a imágenes
        type: 'asset/resource', // Copia las imágenes a la carpeta de salida
        generator: {
          filename: 'public/[name][ext]' // Ruta de salida para las imágenes
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Aplica esta regla a fuentes
        type: 'asset/resource', // Copia las fuentes a la carpeta de salida
        generator: {
          filename: 'assets/fonts/[name][ext]' // Ruta de salida para las fuentes
        }
      } 
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../public/styles.css' // Nombre y ruta del archivo de salida CSS
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'), // Carpeta de origen para imágenes
          to: path.resolve(__dirname, 'public/images') // Carpeta de destino para imágenes
        }
      ]
    })
  ]
};