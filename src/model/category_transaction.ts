import {Serialize, SerializeProperty, Serializable} from 'ts-serializer';


@Serialize({})
class CategoryTransaction extends Serializable {
    id : number
    transaction_id : number
    name : string
}

export  {
     CategoryTransaction
}