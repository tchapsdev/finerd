import WheelPicker from 'react-simple-wheel-picker';
 
const data = [
    {
        id: '1',
        value: 'clothing'
    },
    {
        id: '2',
        value: 'food'
    },
    {
        id: '3',
        value: 'car'
    },
    {
        id: '4',
        value: 'entertainment'
    },
    {
        id: '5',
        value: 'crypto'
    }
];
 
export const Sample = () => {
    const handleOnChange = target => {
        console.log(target);
    };
    return (
       <div><h1 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    }}>Category</h1>
<div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
}}>
        
       
       
        <WheelPicker
            data={data}
           
            onChange={handleOnChange}
            height={150}
            width={150}
            titleText="Enter value same as aria-label"
            itemHeight={30}
            selectedID={data[0].id}
            color="#ccc"
            activeColor="#333"
            focusColor="none"
            backgroundColor="#fff"
            shadowColor="none"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            
        />
        </div></div> 
    );
};