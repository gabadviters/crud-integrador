

// import * as fs from "fs/promises";
// import * as path from "path";

const obj = [
  {
    name: "terminar crud",
    description: "sddsadsaddd",
    priority: 1,
    scheduledTime: "2024-07-19T15:37:57.451Z"
  },
  {
    name: "terminar crud",
    description: "sddsadsaddd",
    priority: 3,
    scheduledTime: "2024-07-19T16:37:57.451Z"
  },
  {
    name: "terminar crud",
    description: "sddsadsaddd",
    priority: 2,
    scheduledTime: "2024-07-19T12:37:57.451Z"
  },

]

const sortData =(obj,order)=> {
 return obj.sort((asc,desc)=> asc[order] - desc[order])
}
console.log(sortData(obj, "scheduledTime"));

// fs.writeFile("asd.txt", "asd", (err)=> {
//   if(err) throw err
  
// } )

const asd = fs.readFile(path.join(process.cwd(),"/")).then(res =>res.json()).then(data => data)

console.log(asd);
