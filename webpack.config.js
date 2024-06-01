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
    clean: true, //filename e [contenthash] eklediğimiz için her build aldığımızda js dosyamızın ismi değişiyordu ve önceki buildlerde oluşan dosyalar distin içerisinde kalıyordu bu mout ile build aldığımızda önceki dosyanın veya dosyaların otomatik silinmesini sağlamış olduk.
  },
  devtool: "source-map", //her build aldığımızda js dosyamız için .map (source-map) uzantılı dosya oluşturur
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), //projedeki hangi dosyayı devserverde çalıştıracağımızı belirtir.
    },
    port: 3000, //dev serverın çalışacağı portu belirtir varsayılan (8080) dir
    //open: true, //npm run dev i çalıştırdığımızda otomatik olarak tarayıcıyı açmasını belirtir.(Bunu açınca dev serverı çalıştıramıyor ve hata alıyorum)
    hot: true, //hotreload ın açık veya kapalı olmasını belirtir.
    compress: true, //gzip sıkıştırmasını etkinleştirir
    historyApiFallback: true, //https://www.quora.com/What-is-History-API-Fallback
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
  //watch: true,
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

//Webpack dev server development modunda her değişikliklikte build almadan değişikliği görmemizi sağlar.
//kurulumu için önce package.json script kısmına "dev": "webpack serve" scriptini ekliyoruz.  terminale npm run dev yazıyoruz
//terminalde wepback webpack-dev-server kurulumu için onay istiyor y ye basıp kurulumu yapıyoruz istersek
//manuel olarak npm i -D webpack-dev-server komutu ile de yapabliriz.Bu adımları tamamladıktan sonra
//npm run dev komutunu çalıştırırsak projemiz varsayılan olarak http://localhost:8080/ portunda açılacaktır.
//webpack serveri özelleştirmek için webpack.config dosyamızda değişiklikler yapabiliriz. devServer{}
//dist dosyamızı silip dev serverı çalıştırırsak dosyamızı silmemize rağmen sayfamızın açıldığını görebiliriz
//bunun sebebi dosyamızı diskten değil bellekten çalıştırıyor olmasıdır.

//source map ler hata ayıklamak için iyidir çünkü çoğu zaman bize asıl sorunun nerede olduğunu göstermeyen satır numarasına sahip hata mesajları
//alırız. dist, production kodumuz için veya kaynak kodumuz için bize bir harita .map oluşturur.
//Oluşturmak için webpack.config dosyamıza devTool: 'source-map', eklememiz yeterlidir.Böylece her build aldığımızda js dosyamızın
//.map uzantılı source-map i de oluşturulacaktır.
