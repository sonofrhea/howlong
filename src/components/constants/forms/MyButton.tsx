import Button from '@mui/material/Button';

export default function MyButton(props: any) {
    const {label, type} = props
  return (
      <Button type={type} className={"myButton"} variant="contained">
        {label}
      </Button>
  );
}
