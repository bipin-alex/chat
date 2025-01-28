const x = 10
console.log("hi")
console.log("hi  ")

console.log("hi  ssadfsa")

const a = [3,5,2,1,8,2]
let obj = {}

let temp = 0
let tempObj = {}
for(let i=0;i<a.length;i++){
    obj[a[i]] =  obj[a[i]]+1 || 1
    // if(!obj[a[i]]){
    //     obj[a[i]] = 1
    // }
    // else{
    //     obj[a[i]] = obj[a[i]]+1
    // }
    if(obj[a[i]]>temp){
        temp=obj[a[i]]
        tempObj={
            [a[i]]:obj[a[i]]
        }
    }
}

console.log(tempObj)




const arr = [3,5,2,1,8,2,8,5]
let obj1 = {}

let temp1 = 2
let tempObj1 = {}
for(let i=0;i<arr.length;i++){
    obj1[arr[i]] =  obj1[arr[i]]+1 || 1
    // if(!obj[a[i]]){
    //     obj[a[i]] = 1
    // }
    // else{
    //     obj[a[i]] = obj[a[i]]+1
    // }
    if(obj1[arr[i]]<temp1){
        // temp=obj[a[i]]
        tempObj1={
            [arr[i]]:obj1[arr[i]]
        }
    }
}
console.log(obj1)
console.log(tempObj1)


let path =  '/home/../../user/Documents/../Pictures'
let array = path.split('/')
console.log(array)
let ar = []
for(let i=0;i<array.length;i++){
    if(array[i]=='..'){
        ar.pop()
    }
    else{
        ar.push(array[i])
    }
    
}
let y = ar.join('/')

console.log(y)