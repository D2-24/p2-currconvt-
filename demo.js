//calculation after submit button
const sbt = document.querySelector("#submit");
const fm = document.querySelector("form");
let err = document.querySelector("#error");
let resultouter = document.querySelector("#result");
let resultval = document.querySelector("#resultval");


sbt.addEventListener("click",function(event)
{
    event.preventDefault();
    let data = new FormData(fm);
    const amount = data.get("amount");
    const from = data.get("from");              //make value of select option's tag string(country name) not index
    const to = data.get("to");

    const errclassadd = ['visible','border','border-danger-subtle','text-danger'];
    if(amount<0)
    {
        err.classList.remove("invisible");
        err.classList.add(...errclassadd);
        err.textContent="Enter valid amount!!!";
        return;
    }else if(from=="select" || to=="select")
    {
        err.classList.remove("invisible");
        err.classList.add(...errclassadd);
        err.textContent="Select valid currency!!!";
        return;
    }
    getdata(amount,from,to);
});

const rst = document.querySelector("#reset");
rst.addEventListener("click",function()
{
    err.classList.add("invisible");
    err.classList.remove("visible");

    resultouter.classList.add("invisible");
    resultouter.classList.remove("visible");
    
    const resultvalclass=["border","visible"]
    resultval.classList.remove(...resultvalclass);
});

async function getdata(amount,from,to)
{
    const respo = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`);  
    console.log(respo) 
    const data = await respo.json();
    const result=data[from][to]*amount;                               //data.usd.inr     (can also be used)             here i dont need hardcode value so used []
    console.log(result);
    showresult(result);
}

//result after calculation
function showresult(result)
{
    resultouter.classList.remove("invisible");
    resultouter.classList.add("visible");
    const resultvalclass=["bg-info","bg-opacity-10","border","border-info","rounded-end","p-2"]
    resultval.classList.add(...resultvalclass);                       //learned about spread operator
    resultval.textContent=result;

    err.classList.add("invisible");
    err.classList.remove("visible");
}


//getting countries
async function getcountries()
{
    const respo = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
    console.log(respo);
    const data = await respo.json();
    console.log(data);
    const arr=Object.keys(data);
    
    let from=document.querySelector("#from");
    let to=document.querySelector("#to");
    for(let i=0;i<arr.length;i++)
    {
        from.innerHTML+=`<option value="${arr[i]}">${arr[i]}</option>`;              //we can also make values as string also b/c data.get() in select gives value 
        to.innerHTML+=`<option value="${arr[i]}">${arr[i]}</option>`;
    }
}
getcountries();



