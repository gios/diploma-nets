export interface IToolbar {
  buttons: IInputButtons;
}

export interface IInputButtons {
  text: string;
  disabled: boolean;
  type: 'primary' | 'warn' | 'accent';
  icon: string | null;
  click: Function;
}
