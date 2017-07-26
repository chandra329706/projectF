import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabFilter'
})
export class TabFilterPipe implements PipeTransform {

  transform(TotalTransactionHistoryListData: any, TabFilterText: any): any {
    if(TabFilterText === undefined) return TotalTransactionHistoryListData;

    return TotalTransactionHistoryListData.filter(function(transaction){
      return transaction.main_tran_type.includes(TabFilterText);
    })
  }

}
