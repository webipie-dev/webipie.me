function compare_date(beginDate, endDate){
    if (beginDate) 
        beginDate = new Date(beginDate);
    if (endDate) 
        endDate =  new Date(endDate);
    return !(beginDate >= endDate && endDate);
}

module.exports.compare_date = compare_date;
