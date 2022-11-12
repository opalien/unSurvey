export default function is_in(parse, string, type){
    var i = 0;
    var entries = Object.entries(parse);
    for(i=0; i < entries.length; i+=1) {
        if (string == entries[i][0]){
            if(typeof(entries[i][1]) == type) {
                return true;
            }
        }
    }
    return false;
}