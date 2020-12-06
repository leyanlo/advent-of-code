function solve1(input) {
  const layerSize = 25 * 6;
  const nLayers = input.length / layerSize;
  let layerWithFewestZeros = null;
  let fewestZeros = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nLayers; i++) {
    const layer = input.substr(i * layerSize, layerSize);
    const nZeros = layer.split("").reduce((nZeros, pixel) => {
      return pixel === "0" ? nZeros + 1 : nZeros;
    }, 0);
    if (nZeros < fewestZeros) {
      fewestZeros = nZeros;
      layerWithFewestZeros = layer;
    }
  }

  const pixelCounts = layerWithFewestZeros
    .split("")
    .reduce((pixelCounts, pixel) => {
      pixelCounts[pixel] = (pixelCounts[pixel] || 0) + 1;
      return pixelCounts;
    }, {});
  console.log(pixelCounts["1"] * pixelCounts["2"]);
}

function solve2(input) {
  const width = 25;
  const height = 6;
  const layerSize = width * height;
  const nLayers = input.length / layerSize;
  const finalImage = [...Array(layerSize)].map(() => 2);
  for (let i = 0; i < nLayers; i++) {
    const layer = input.substr(i * layerSize, layerSize);
    layer.split("").forEach((pixel, i) => {
      if (finalImage[i] === 2) {
        finalImage[i] = +pixel;
      }
    });
  }

  for (let i = 0; i < height; i++) {
    console.log(
      finalImage
        .slice(i * width, (i + 1) * width)
        .map((pixel) => pixel || " ")
        .join("")
    );
  }
}

const input = `202222221222221022222222222222222222220220010222222221222220022202222221222220222222222222222222222222222202220212022222202222222012200222221222220222222222220222220222222222222222222222221221122222222221222220222202222220222221222222222222222222222222222202220222222222202222222122212222221222221222202222220222221222222222222222222222201222102222222220222220222202222220222222222222222222222222222222222212222212222222222222222012200222220222221222202222220222222022222222022222222222200222022222222222222221222202222221222221222222222222222222222222222212220222122222222222221222200222220222222222202222221222221222222222022222222222211221011222222220222221122202222220222221222222222222222222222222222202220212022222212222221022211022220222222222202222221022222022222222122222222222200222201222222221222220222202222222222221222222222222222222222222222212221202122222222222220202212222220222221222202222221122222122222222222222222222210222100222222220222222222212222221222221222222222222222222222222222212220202122222222222220212202122220222220222222222222022220222222222022222222222221221211122222222222220022212222221222221222222222222222222222222222202220212122222202222221012222122220222222222202222221122221222222222222222222222222222022022222222222222222212222222222220222222222222222222222022222222220212122222202222222102202122221222221222212222220122220122222222022222222222210221001022222221222200022222222220222220222022222222222222222222222222221202222222212222220102200122222222220222212222222022222222222222222222222222211222211122222221222222022222222221222220222222222222222222222122222222221212022222212222221122220122221222220222202222221222220022222222122222222222222222120022222222222201022222222222222221222022222222222222222222222222221202022222212222220122220022222222222222212222221122221122222222222222222222200220021022222222222201122212222221022220222022222122222222222222222202220212222222212222220012222122222222222222222222222122222122222222022222222222210220000022222222222212222222222220002222222122222122222222222222222212221222112222202222220102201222222222222222222222221122222222222222122222222222201221120222222221222201022212222221112222222222222022222222222222222202220202112222112222222112201122220222221222212222221022220222222222022222222222222221102222222221222222222202222221122220222222222222222222222222222222221212002222012222220202010222221222220222222222222022222222222222022222222221210222002222222221222202122212222220002220222222222022222222222222222202221222022212002222222022010122222222221222212222222122220222222222122222222222200221100222222221222221122202222221112221222222222222222222222122222222220202022202022222220012221122220222220222222222220122221122222222022222222222222222110022222220222210222202222221112220222222222222222222222122222212220212222222212222220112201222220222221222222222220222220222222221122222222222202220201222222220222200122212222220022222222122222122222122222222222212220222002222022222221122120222222222221222222222220222222222222221022222222221211221120022222222222211222102222222202220222022222022222222222222222202222212212212212222220202101002222222221222212222220022222222222202022222222221202220200122222222222221222012222221002222222122222222222022222022222222220222012222022222222202021012221222222222202221220122222222222211122222222220201222120222222220222200122212222222012220222122222122212222222122222212221212022212122222220122202212222222222222212220221022220022222202022222222221202222002022222221222220222002222222222221222222222222212222222022222202220222022222002222221202111212222222220222202221222222221022222210022222222220202221212222222220222220022002222220112222222022222122222222222022222202222202102202222222221022211102222222222222222221220222222122222220022022222220221221010022222222222222022012222222022220222222222022202222222022222222221202212222002022222112122102220222220222202220222122222122222200122022222220210220211102222220222221122012222222222222222222222222202222222222222222220222022202001222220202211202220222222222212222221222221022222221022122222222201220022222222222222211122122222221022220222122222222212022222122222222221222212222001122220202021002221222220222202222212122222222222212122222222220212222212122222221222220022222222221022220222122222222202222222122222222221202202222021022221012210012221222222222202220221122221222222220122122222220201221210002222220222220022022222220222221222022222122202122222222222222220222122202111122222212122022222222221222202221202022221122222201222022222220211220211022222220222222122002222222202222222222222122222022222122222212222222012202211122220222020002222222022222212220220122222022222200022022222220202222202012222221222211222122222222012220222122222122202221222222222202220212012212220022222112120222220222022222202220202022221022222220122222222222200221111102222221222211122022222222120221222122222122222120222222212212220222002222120222220012220222222222121222222221222222222122222200122222222221201220111112222222222201122212221222110221222222222022212121222122222222221222022202200022020122100212222222220222222220221222221222222212220022222220222220121002222222222222122202220221010222222222222120202122222022202222220202022202102122021202200002221222221222202220220222220222222222021122222220211221020202222220222211022222220222012221222222222122222120222022222202222212212212121022222102020212220222222222222221211222220222222222222222222221220221000202222220222210122012221221100221222222222221212122222222212222221202112202220222221022012212221222021222222220220122220122222221021122222222211221112022222222222211022002220220001220222222222120222221222122222212222212112222102122020002120012220222021222212222220222221022222200120122222220200220111222222221222220022102220222121222222022222120212120222222202202221222122202101222020022110102220222221222222222201222222122222201220122222220212221001112222212222202022012221221000222222222222222202222222112222212220202022212122022220112212122221222122222222220202122221022222221021220222222221222010212222211222221122002220222011221222022222121222221222122222222220202022222011022020112120102220222220222212220221222221022222200021021222220212221112122022202222200022102220221120220222122222020202021222012212212020212122202012122120112102022222222221222212221211022220222222220222222222222220220000212022212222220222102221222210222222022222120212121222012202212222202002202211222222022202002220222022222212221200222221222222222022222222222222221022012122212222211122112221220021221222122222121202122222212212222120212212222111222122002011202222222021222212221222222222222222200120220222221220220112222122212222212022022221221111220222022222222212121222002212222121202222202200022022022200202222222122212212221220222220122222200121020222222200221220122122212222211022022221222022221222222222220212220222002202222121202112212220222221002220112221222222222222222222122220222222200220022222222202222012012122221022220122202220222122221222022222022202021222222212222221212102222010022121102202122222222220212212222200122222222222212022021222222222220102002222202222212022101222220211221222122222020212020222102212222020212022202212122120112022022220222122222202221220020220222222200021120222221211220022002202200122220022101222220212220222122022021212220222002222222120212112202212222121122001212221022122212212221202021022122222221221021222220201210001002102200222212122121222220121221222022022022222021222102212222221222122202001222200222212022222022022212202221211220121222222221022122222221220200202102112221222200022210220222110221222222222021212022222012222212020212202210101022212112222222221022020212202221200222022222222222122121222221202211122112222221222222022211220220021221222222122221222022222202222202020202202221120021111012110212021022121212212222210020021022222221220021222221220212012212112202022222222220222221220222222022022221202221222102212212020212122222102020220122111122220122122222222221201122122122222220120122222222221120210012222221122202022010220222011222222022022021202021222212222202022202222220012121120002100212122122121222222220212222122122222220220122222220201120221022202201122202222220022220212221222022122221222221222002222202022222102212102120021102022012021222021202222222212122221122222222021220222222212222022122112212122222022022021222222222222222122122222020212122202222222222112221110222002122022002121222021212202220202122121122222221022021222221220211020212112201122201122021220221120120222222122020222120222112212202222212202202100222120002111202120122120202202222220021200222222211220221222221221100011222222201022212222100020011010121222120222222202221212002210202222202112220011002210122100222220122122202222220212021122122222202222122222220201201221202012221222221122212022211010120222220222021212221202022200222020212022210021212201102212221022122221212212221201120000022222201021222222222210110112202012221022201122222120120111222222221022120212021202212202222220202202210021112210102000200220022220202222220211122121122222202221020222222211201211102222222122201122210120001220121222021022221202222202102200212021202002210021111121102111210121022221202202221210021221122222200022220222221210210220002002212122212122002220100020221222021122220222022212202211220121212022222010012001012110211222222121202222221201022120122222222022220222221210220100112112202122202022121020121220122222221222221222221002012211201022222202221102012212112220011020222222212222220200122001022222202122221222220222100012222002201122101222121121210220122222122122121212121102112211220222202122210110012111022210112222022222202222221202220000122222201120122220222202021120112122222222102122002220012010121222221222021222022222002220211020202202221001220010022000221021022021222222201210122122222222222120121221221201022101202102212222120022021201020101220222020022120212222212222201211122222202220100211001212212202021122121202202221222220101122222222021120222222202122101202112200022102022121211222202220222220222222212220212202221221020202002212010122000022011120222222020202212212210021010222222222222122220221200122212012202220122120222212211222000220222022122221222220002202220220121212102220111000211012112112222122120222222221220221110222222210221122221221201211000002212222022122122122201202021222222121122122212121122022200222022222022222200102102222200221120122221222202200200121021222222200222122221222222112221222012202022110022202021201010021222121122021222222102202200201020222002212200022000102100120021122222202222201212220220122222200222121220220222102202202112201222110122112222111202020222122022122202120102112211221220202202211112210111122120110020122222222202210212022202222221212120022200221202100201202202211022110122220211021102020222121022222212221102022202210222202112220110001012102211110021022220222212221210122210122220210120221220220222001201002102222222120122222210100010222222021122122212121202212201210020202012212221000122002212022121022020212212200211022112122222220222022221222212001112022122202122120022002102121220120222020022120212220222202202200020212120200000202221002011211020022020222202221200220022122220201020020220222222202022102212201022121222010021121200020222122222022222122012022202212120202112220122011221222002211122122220200222202212022200022222222120121221222211210021112012200022201122210221022122022222221002222222021012222211220121202002201111120010022120002121022020222212221210222112022222210122221222221021220020102102210222100122120121220222121222020202221222020112112212202021222212202121010011222001001120102122212212220212021200122222210121020202222002012122212002222022100122220110020120122222222002020222021212212200210222202011221101002200112021122120222021202202220202222120122221220021021220222211101022102202102222100222120212210122020222021102022222122202222210202122012101210021100021102201221222002122220222200220021021222220210120222211222101010021122012020022020222112110012110122222220022120222022112022221202122022201222210221002002002222021122221210212221222221202021221222122222221220210110000122122211112011022011200121202221222020222121201022112002222200221212222222221010122122211210220202122212122200211221021021201201021120211221022121011222102121112101022001212000011122222122212022212122102122202202001102222212010002122212112022020012120222202221202020120020220221120122202221010201122022212221012202222021121201101022222222212020210222122022221210222012010221111010022102001000220022120220112212210122120222222201020122202222120012002212011121222012022002222201120221222122122221200120202212202212212022120212220102220002212000022012122222212210212221220222212202220221220221102020002022022122002111022100000021102120222120202222222222122012020222121112100221221012101102200222222002222210122222201021022021222221022220220221200020121012002222212211222220222010010221222120212222211020122002101200202212122200212001010002112122021012021211112220200120112122211212020220201220210101220102112122212002022102222011102022222020102122122122002112100212111002002202210212020102022112222112222222002212221121122022201210020220222221001211101102121000112220022212200011202020222222002222221222112002200200000102002210010020210002002021222102221202012222210122202122212210120222220221220120210212100201112122022121202222111222222221112121211222122122000212120122120201022202100022010122022222121221102221210222120122222201222021210222022010202222012121202121222210212221121222222120222122222021202022211122200122002202022012211002210110022112222200122201211120212122002202222122222220101200200202110011201001022022121212212122222021102122210121222102010001010222011201100010020112100210020012020212222220221221020020020221122220212221211220110101122100021100222122021021210122222022102221001121222212110220121222002200022211211112110221021202221221112200202120112022200200120222221221111111110221122202020220122120020122221121222020122222101122002122221220211202211201121110212022122201020002121211120212201221202020121210020020210202201220000100001100201100122011110201201020222021202021020222202012201200020022000220010020111222000010020122121211222200210021022022200211122222200210102220111010001211111011122220002200211020222120022221011021002222100121201212002201001212210122111220022022021201012220212121022122011200221022220220201112210221212011012020020202011111110220222022222021121022210222121001021102102220211222211212220221221202222211011210212121122021011202121120222222110022212022110221020210121121101101101222222120022122112121201012122222112022222220202102010022211222022212022220001222200222210221112212121022221202022102002220002122200121120111100012210222222121102022112122112102100012020022021222010221020112011121221102221222222210200021121022122201122122211210022202000110120220112021021001010121021021222121022021111222202012002122120022201202122101111212002211021122121201210101111112011211112022210211122020112121120201101000001002011021101101012001101101000101112201110220000200000000222000010102000120121221201211012020`;

solve1(input);
solve2(input);
