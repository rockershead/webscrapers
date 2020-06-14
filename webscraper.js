const puppeteer=require('puppeteer');
const cheerio =  require('cheerio');
const axios = require('axios');
var page_no;
var data_arr=[];

//lets scrape a lazada sub-url

//scraping using puppeteer
async function puppetscraper(){




let url='https://www.lazada.sg/beverages/?page=2&spm=a2o42.home.cate_6.1.5f1946b5b9hRRR';


let browser=await puppeteer.launch()

let page =await browser.newPage()

await page.goto(url,{waitUntil:'networkidle2'})

let data=await page.evaluate(()=>{

  name=document.querySelector('div[class="cUQuRr"]>h1').innerText
  no_of_items=document.querySelector('div[class=" c1DXz4"]>span').innerText  //11490 items found in
  no_of_items=no_of_items.match(/\d+/g).map(Number)[0]    //11490
  list_of_items=document.querySelector('div[class="c1_t2i"]').innerText

  //these are items on first page only.how to do for other pages?can usepage attribute in url but got issues.doesnt work

  return {
      name,
      no_of_items,
      list_of_items
    
    
    }

}



);





console.log( data);

};



//scraping using axios and cheerio
function simplescrape(){

    let url='https://www.lazada.sg/beverages/?spm=a2o42.home.cate_6.1.5f1946b5b9hRRR'

        axios.get(url).then(response=>{

          var $ = cheerio.load(response.data)

          console.log($('.c3o2ls').text())

           

          //$('.c1_t2i').each((index,element)=>{
//
  //            console.log(index)

    //        item=$(element).find('.c2prKC').text()

      //      console.log(item)
            

        //  })
          

          

         



        }).catch(error=>{

          console.log(error)
        })








}







puppetscraper();
//simplescrape();
