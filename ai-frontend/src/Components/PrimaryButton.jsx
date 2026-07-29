import Button from '@mui/material/Button';
function PrimaryButton(props){
    return(
        <Button variant ="contained"
                size={props.size}
                onClick={props.onClick}
                disabled={props.disabled}
            sx={{
                background:props.background,
               border: "2px $background solid",
               borderRadius: "10px",
               color: props.color,
               fontWeight: 'bold'
            }}>
            {props.children}
        </Button>
    );
} export default PrimaryButton;