import generateJoke from "./generateJoke";
import "./styles/main.scss";
// import { v4 as uuidv4 } from "uuid";

console.log(generateJoke());
// console.log(uuidv4());

//1-
//webpack kurulumu yaptıktan sonra bu dosyayı ve generateJoke.js dosyasını oluşturdum. Öncelikle generateJoke fonksiyonunu
//buraya import ettim ve bu dosyayı da index.html e import ettim çalışltırdığımda console da
//"Uncaught SyntaxError: Cannot use import statement outside a module"
//Hatası aldım çünkü import özelliğini kullanmak için package.json da ona özel bir düzenleme yapılması gerekiyor.
//Bunu yapmadım çünkü webpacki build ettğimizde dist içerisinde derlediği main.js dosyasında bu hatayı kendi düzeltiyor.
//Bu yüzden terminalden package.json daki webpackbuild scripti ile build aldım index.html de src içerisindeki index.js i değil
//webpackin dist/main.js içerisinde index.jsin derlenmiş halini import ettim.

//bir npm modülü kullanmak istersek terminalden npm komutu ile indirdikten sonra indirdiğimiz npm modülü webpack buildi aldığımızda
//otomatik olarak derlenir ve derleme dosyamıza eklenir.başlangıçta npm i uuid ile paketi indirdim nasıl gözüktüğünü görmek için
//build aldım sonrasında npm remove uuid ile module ü kaldırdım (Buradan sonra webpack.config.js dosyasını oluşturduk)
