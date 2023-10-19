async function myProductListHandler() {
   
    const list = await fetch('/api/getmygifts',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

    return await list.json();
}

export default myProductListHandler;