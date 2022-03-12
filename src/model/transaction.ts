import {Serialize, SerializeProperty, Serializable} from 'ts-serializer';

@Serialize({})
 class Transaction extends Serializable  {
    id : number
    transaction_type_id:number
    category_id : number
    descritpion : string
    montant : number
    date : Date
    photo : string

}

export  {
    Transaction
}






