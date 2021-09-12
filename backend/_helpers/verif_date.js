
function compare_date(beginDate, endDate){
    if (beginDate) 
        beginDate = new Date(beginDate);
    if (endDate) 
        endDate =  new Date(endDate);

    if(beginDate >= endDate && endDate){
        return false
    }

    return true;
}

module.exports.compare_date = compare_date;