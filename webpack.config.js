const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", //build aldığımızda hangi modda alması gerektiğini belirtir
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"), //Hanagi dosyayı derlemesi gerektiğini ve derlenen yeni dosyanın nasıl adlandırılacağını belirtir
  },
  output: {
    path: path.resolve(__dirname, "dist"), //derlenen ve yeni oluşturulan dosyanın hangi dizinde oluşturulacağını belirtir
    filename: "[name][contenthash].js", //derlenen ve yeni oluşturulan dosyanın ismini entry kısmındaki bundle ismiyle oluşturur oraya ne yazarsak o isimle oluşturacaktır.
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/, //Bu (scss) uzantı ile biten bütün dosyaları seçer
        use: ["style-loader", "css-loader", "sass-loader"], //seçtiğimiz (scss) uzantılı tüm dosyalarda bu loaderları artık kullanabiliriz
      },
    ],
  },
  //   watch: true,
};

//HTMLPlugin src de oluşturduğumuz html sayfamızı derlememizi sağlar. dist klasörünü silsek dahi tekrar build ettğimizde html ve js
//dosyalarımızın bundle hali tekrar dist dosyası ile bereaber oluşrurulur.
//Kurulumu için "npm i -D html-webpack-plugin" komutu ile paketi indiriyoruz.
//const HtmlWebpackPlugin = require('html-webpack-plugin') ile config dosyamıza import ediyoruz.
//plugins:[] kısmınanew HtmlWebpackPlugin({}) ile pluginimizi eklemiş oluyoruz.
//Artık build aldığımızda dist klasöründe olmasa dahi bir index.html dosyası eklenecek fakat içi boş bir template olarak gelecek.
//dist dosyasındaki index.html de bir değişiklik yapıp build aldığımız zaman değişiklikler silinir ve boş bir html template i gelir.
//Bizim burada yapmamız gereken template kulllanmaktır.HtmlWebpackPlugin({}) içerisine template:"dosya ismi" ile derlenecek
//html dosyamızı belirtmiş oluruz.

//output kısmında filename: "[name][contenthash].js" eklediğimiz [contenthash] her build ettiğimizde değişen dosya adımızın yanına rastgele
//sayılar ekler bunun sebebi cache önlemek içindir.İstersek kullanabiliriz.İstemezsek filename: "[name].js" şeklinde kullanım yapabliriz.

//loaderlar css scss images gibi veya sass ı compile etmesi gibi işlevlere yardımcı olur şimdi scss imizi csse e derleme ve webpacke
//nasıl ekleyeceğimizi göreceğiz.
//"npm i -D sass style-loader css-loader sass-loader" komutu ile bize gereken paketleri yüklüyoruz.
//src/styles/main.scss dosyamızı oluşturduk. Ardından src/index.js dosyamıza react ta yaptığımız gibi scss dosyamızı
//import "./styles/main.scss" ile import ediyoruz build aldığımızda yüklediğimiz loaderların kurulumunu yapmadığımız için error alırız.
//loaderları yönetebilmek için webpack.config.js de modeule: {} objesi oluşturuyoruz ve içerisinde hangi uzantılı dosyalarda hangi loaderları
//kullanacağımızı belirtiyoruz.Artık build aldığımızda loaderlar sayesinde sass otomatik compile edilecek ve webpackimize eklenecek.
//İstersek farklı scss dosyaları oluşturup main.scss dosyası içerisinde import edebiliriz.
