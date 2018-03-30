/** 说明
* -t-2010 时间2010年以后  
* -p-10-50  从第10页到第20页
* -s-安徽		安徽省
* -c-厦门		省下的城市
*/ 
const superagent=require('superagent');
const cheerio =require('cheerio');
const fs =require('fs');
const xlsx =require('node-xlsx');
const cityList=require('./city.json');//省份列表
const output=require('./output.json');//省份列表
const cookie1="UM_distinctid=1626bac6f8687-0840d65dade33b-5393662-1fa400-1626bac6f875f5; _uab_collina=152222491705213074621663; hasShow=1; acw_tc=AQAAANC3HTZo2gkAaNBqJGxy27ykvObF; _umdata=BA335E4DD2FD504F0740D93BD4FAAB28A284A1C40D21038DB793A51CCFC35C986AA52BC166DDC140CD43AD3E795C914C0596A84E462C23354E0702BF2901EF95; PHPSESSID=sm7qo8pmossog7ortb5qplhsd3; zg_did=%7B%22did%22%3A%20%221626bac6f9c751-02ee7a7ac7be07-5393662-1fa400-1626bac6f9d559%22%7D; CNZZDATA1254842228=1524302384-1522219793-https%253A%252F%252Fwww.baidu.com%252F%7C1522302766; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1522224886,1522284807; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1522305841; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201522305839642%2C%22updated%22%3A%201522305849367%2C%22info%22%3A%201522224885669%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.qichacha.com%22%2C%22cuid%22%3A%20%22c06e9621b57a50249a6064d0b574c7e6%22%7D"
const cookie2="PHPSESSID=3bf7ks3job1l9lp3tck9n1jqa3; UM_distinctid=1626ba988b346a-0f02bcf546c8c-33697b04-13c680-1626ba988b45a7; zg_did=%7B%22did%22%3A%20%221626ba988cc225-05e104c2fde616-33697b04-13c680-1626ba988cd9a2%22%7D; acw_tc=AQAAALTiJmfuBwUAvdVqJLI32wZZCuUd; _uab_collina=152222471713775112862514; CNZZDATA1254842228=1961901678-1522219793-https%253A%252F%252Fwww.baidu.com%252F%7C1522285949; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1522224696,1522287714; hasShow=1; _umdata=E2AE90FA4E0E42DE488F30724FCF98ECC5C78424EF1D3DF08AD7567F6C4279255F211AA6B738E6D9CD43AD3E795C914C17B60DAC5E8F581293A26399E27B84AA; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1522287745; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201522287713781%2C%22updated%22%3A%201522287760116%2C%22info%22%3A%201522224695510%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.baidu.com%22%2C%22cuid%22%3A%20%22fc68679f620d4a2d846a6bf4fa0945a4%22%7D";
const cookie3="PHPSESSID=3bf7ks3job1l9lp3tck9n1jqa3; UM_distinctid=1626ba988b346a-0f02bcf546c8c-33697b04-13c680-1626ba988b45a7; zg_did=%7B%22did%22%3A%20%221626ba988cc225-05e104c2fde616-33697b04-13c680-1626ba988cd9a2%22%7D; acw_tc=AQAAALTiJmfuBwUAvdVqJLI32wZZCuUd; _uab_collina=152222471713775112862514; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1522224696,1522287714; hasShow=1; _umdata=E2AE90FA4E0E42DE488F30724FCF98ECC5C78424EF1D3DF08AD7567F6C4279255F211AA6B738E6D9CD43AD3E795C914C17B60DAC5E8F581293A26399E27B84AA; CNZZDATA1254842228=1961901678-1522219793-https%253A%252F%252Fwww.baidu.com%252F%7C1522291664; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1522293299; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201522293292830%2C%22updated%22%3A%201522293309831%2C%22info%22%3A%201522224695510%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%22fc68679f620d4a2d846a6bf4fa0945a4%22%7D";
const cookie4="PHPSESSID=3bf7ks3job1l9lp3tck9n1jqa3; UM_distinctid=1626ba988b346a-0f02bcf546c8c-33697b04-13c680-1626ba988b45a7; zg_did=%7B%22did%22%3A%20%221626ba988cc225-05e104c2fde616-33697b04-13c680-1626ba988cd9a2%22%7D; acw_tc=AQAAALTiJmfuBwUAvdVqJLI32wZZCuUd; _uab_collina=152222471713775112862514; _umdata=E2AE90FA4E0E42DE488F30724FCF98ECC5C78424EF1D3DF08AD7567F6C4279255F211AA6B738E6D9CD43AD3E795C914C17B60DAC5E8F581293A26399E27B84AA; Hm_lvt_3456bee468c83cc63fb5147f119f1075=1522224696,1522287714,1522310701; CNZZDATA1254842228=1961901678-1522219793-https%253A%252F%252Fwww.baidu.com%252F%7C1522367807; hasShow=1; Hm_lpvt_3456bee468c83cc63fb5147f119f1075=1522372600; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201522372042549%2C%22updated%22%3A%201522372643474%2C%22info%22%3A%201522224695510%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%22fc68679f620d4a2d846a6bf4fa0945a4%22%7D";
const reptileUrl ="http://www.qichacha.com/search?";

var myarguments = process.argv.splice(2);
console.log(myarguments);
var outarr=[];//key的数组
var data={p:1};
var pnum=[1,500];//默认加载多少页

var getquery={
	"t":"startDate",
	"s":"province",
	"c":"city"
}

var sname="";//省名
var cityname="";//市名

var filename="";
myarguments.forEach(function(val){
	if(val.indexOf('-')==0){
		var thisarr=val.split('-');
		if(thisarr[1]=="p"){
			if(thisarr.length==4){
				pnum[0]=thisarr[2];
				pnum[1]=thisarr[3];
			}else if(thisarr.length==3){	
				pnum[1]=thisarr[2];
			}
		}else{
			if(thisarr[1]=="s"){
				console.log(cityList[thisarr[2]]['name']);
				data[getquery[thisarr[1]]]=cityList[thisarr[2]]['name'];
				sname=thisarr[2];
			}else if(thisarr[1]=="c"){
				var cityarr=cityList[sname]['list'];
				console.log('cityarr=='+cityarr);
				cityname=thisarr[2];
				for(var index in cityarr){
					console.log(cityarr[index]);
					var str=cityarr[index]['name'];
					console.log("str===="+str);
					if(str.indexOf(thisarr[2])!=-1){
						data[getquery['c']]=cityarr[index]['val'];
						break;
					}
				}
			}else{
				data[getquery[thisarr[1]]]=thisarr[2];
				filename+= "_"+thisarr[2];
			}
		}
	}else{
		filename+=val;
		outarr.push(val);
	}
});
if(outarr.length){
	data.key=outarr.join(' ');
}
data.p=pnum[0];
var over=true; 
var num=0;//加载了几页停顿一下
var num2=0;//数据为空时重复几次加载
var outData=[{name:'企查查',data:[['公司名称','法定代表人','注册资本','成立时间','电话','邮箱','地址']]}];
function getData(){
	console.log(data);
	superagent.get(reptileUrl).query(data).set('Cookie', cookie3).end(function (err,res) {
		// 拦截错误
		if(err){
			console.log('error=========='+err);
			return Error(err);
		}
		/**
	   * res.text 包含未解析前的响应内容
	   * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
	   */
	   	let $ = cheerio.load(res.text);

	   	console.log("p===="+data.p,'p2===='+pnum[1],$('.m_srchList>tbody>tr').length);
	   	if(!$('.m_srchList>tbody>tr').length){
	   		if(num2<=2){
	   			num2++;
	   			setTimeout(function(){
	   				getData();
	   			},6050);
	   		}else{
				getxls();
	   		};
	   	}else{
	   		num2=0;
			$('.m_srchList>tbody>tr').each(function(index,val){
				var nstatus=$(this).find('.nstatus').text();
				if(nstatus.indexOf('存续')!=-1||nstatus.indexOf('在业')!=-1||nstatus.indexOf('正常')!=-1){
					nstatus="ok";
				}
				var that=$(this).find('td').eq(1);
				console.log('next==='+that.find('.ma_h1').text());
				//电话号码
				var tel="";
				var telP=that.find('.m-t-xs').eq(1);
				// console.log(telP.text());
				tel=telP.text().substring(telP.text().indexOf('：')+1,telP.text().indexOf('邮')-1);
				if(tel.indexOf('-')!=0&&nstatus=="ok"){
					var newarr=[
						that.find('.ma_h1').text(),
						that.find('.text-primary').text(),
						that.find('.m-t-xs span').eq(0).text().slice(that.find('.m-t-xs span').eq(0).text().indexOf("：")+1),
						that.find('.m-t-xs span').eq(1).text().slice(that.find('.m-t-xs span').eq(1).text().indexOf("：")+1),
						tel,
						telP.find('.m-l').text().slice(telP.find('.m-l').text().indexOf('：')+1),
						that.find('.m-t-xs').eq(2).text().slice(that.find('.m-t-xs').eq(2).text().indexOf('：')+1)
					];
					outData[0].data.push(newarr);
				}
			});
			data.p++;
			num++;
			if(data.p<=pnum[1]){
				if(num==10||num==20){
					setTimeout(function(){
						getData();
					},3050);
				}else if(num==30){
					num=0;
					setTimeout(function(){
						getData();
					},6050);
				}else{
					getData();
				}
			}else{
				// console.dir(outData);
				getxls();
			}
		}
	})
}

function getxls(){
	if(sname){
		filename+="_"+sname;
	}
	if(cityname){
		filename+="_"+cityname;
	}
	var buffer = xlsx.build(outData);
			fs.writeFile('./'+filename+'('+pnum[0]+"-"+pnum[1]+')'+'.xls', buffer, function (err){
				    if (err)
				        throw err;
				    console.log('完成！');
					// 读xlsx
				    // var obj = xlsx.parse("./" + "resut.xls");
				    // console.log(JSON.stringify(obj));
				}
	);
}

getData();
