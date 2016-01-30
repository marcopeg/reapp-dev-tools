


// export function getGuideSourceCode(filePath) {
//     var source = fs.readFileSync(filePath, 'utf-8');

//     var sections = source.match(/<SGSection(.|\n)*?<\/SGSection>/g).map(function (section) {
//         var title = section.match(/ title="(.+)"/g).shift();
//         title = title.substr(0, title.length - 1).replace(' title="', '');
//         var sectionSource = section.split(/\n/g);
//         sectionSource.shift();
//         sectionSource.pop();

//         var tabSize;
//         try {
//             tabSize = sectionSource[0].indexOf('<');
//         } catch (e) {
//             tabSize = 0;
//         }

//         sectionSource = sectionSource.map(function (line) {
//             return line.substr(tabSize, line.length);
//         });

//         return {
//             title: title,
//             source: sectionSource,
//         };
//     });

//     return {
//         filePath: filePath,
//         sections: sections,
//     };
// }
