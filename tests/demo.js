
let expenses = [10, 20, 30, 40, 50]

let sum =0

let su = expenses.reduce((s,ex)=>s+ex,0)
console.log(su)

let max = expenses[0]

for (let i=0; i<expenses.length;i++)
{
    if (expenses[i] > max)
    {
        max = expenses[i]
    }


}
console.log(max)

let min = expenses[0]

for (let i=0; i<expenses.length;i++)
{
    if (expenses[i] < min)
    {
        min = expenses[i]
    }
}
console.log(min)

let studentNames = ['pranithi', 'sri', 'sriya', 'priya']
studentNames.unshift('shreya')
console.log(studentNames)
delete studentNames[4]
console.log(studentNames)
studentNames.sort()
console.log(studentNames)

let productPrices = [30, 40, 50, 60, 80]
let discountedPrices = productPrices.map(a=> (a - a/10))
console.log(discountedPrices)

let affordableProducts = productPrices.filter(b=>b<50)
console.log(affordableProducts)

let total = affordableProducts.reduce((su,d)=>su+d,0)
console.log(total)