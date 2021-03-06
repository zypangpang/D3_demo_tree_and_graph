//let train_ids, train_infos,train_list,city_infos;
let info = {}; // {起点站：{到达站：{跳数，价格，时间}}}
let sumInfo = {}; // {起点站：Set(重点站)}
function load_data(files){
    info=files[0];
    sumInfo=files[1];
    /*train_ids=files[0];
    train_infos=files[1];
    train_list=files[2];
    city_infos=files[3];*/
}
let tree_type=true;
let layer;
function main(data){
    load_data(data);
    console.log("data done");
    /*console.log("begin init");
    init();
    console.log(Object.keys(info).length);
    console.log("finish init");*/
    console.log("begin find");
    //layer = findLayerConnections('北京南',200 , 'time' );

    //radial_tree(layer,'tree_div');
    //tree_map(layer,'tree_div');
    //downloadTextFile(JSON.stringify(sumInfo),"sumInfo.json");
    d3.select("#tree_type").on('change',function () {
        tree_type=this.checked;
        tree_update();
    });
    $("#input_form").submit(function (event) {
        event.preventDefault();
        let station=$("input[name='station']").val();
        let scale=$("input[name='scale']").val();
        let dimension=$("select[name='dimension']").val();
        layer = findLayerConnections(station,+scale, dimension );
        d3.select("#station_count").text(count_tree(layer));
        tree_update();
    });
    $("#input_form").submit();
}
function count_tree(root) {
    let val=1;
    root.children.forEach(c=>val+=count_tree(c));
    return val;
}
function tree_update() {
    d3.select("#tree_div").selectAll("*").remove();
    if(tree_type){
        radial_tree(layer,'tree_div');
    }
    else{
        tree_map(layer,'tree_div');
    }
}
function downloadTextFile(text, name) {
  const a = document.createElement('a');
  const type = name.split(".").pop();
  a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
  a.download = name;
  a.click();
}

console.log("fetch data");
Promise.all([
    d3.json("../data/info.json"),
    d3.json("../data/sumInfo.json"),
]).then(data=>main(data)).catch(error=>console.log(error));

