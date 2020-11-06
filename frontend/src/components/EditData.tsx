import React, { ChangeEvent, Component, ReactElement } from "react";
import {AllowEdit, CancelEdit, CheckEdit, LoadingIcon} from "./Common";

type Props = {
    data: string | object;
    dataKey?: (string | number);
    onOk: (data: any) => boolean | Promise<boolean>;
    input: ReactElement;
    btnCancel: ReactElement;
    btnCheck: ReactElement;
    btnEdit: ReactElement;
    loader: ReactElement;
};

export class EditData extends Component<Props> {
    static defaultProps = {
        data: "",
        btnCancel: <CancelEdit />,
        btnCheck: <CheckEdit />,
        btnEdit: <AllowEdit />,
        loader: <LoadingIcon />
    }

    public state ={
        edit: false,
        inputValue: "",
        loading: false,
    }

    private handleEdit = () => this.setState({edit: true});

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (this.state.edit) {
            this.setState({inputValue: e.target.value})
        }
    };

    private handleCancel = () => 
        this.setState({edit: false, inputValue:this.props.data});

    private handleCheck = async () => {
        this.setState({loading: true})
        const { dataKey} = this.props;
        const data = dataKey?{dataKey: this.state.inputValue}:this.state.inputValue;
        await this.props.onOk(data);
        this.setState({loading: false, edit: false});
    };

    public componentDidMount(){
        const { edit, inputValue } = this.state;
        const { data } = this.props;

        if (!edit && inputValue !== data) 
            this.setState({inputValue: data})
    };

    public render() {
        const { edit, inputValue, loading } = this.state;
        const { input, btnCancel, btnCheck, btnEdit, loader} = this.props;

        return (
            <div className="field is-grouped">
                <input.type {...input.props}
                    value={inputValue}
                    onChange={this.handleChange}
                />
                {loading?<loader.type {...loader.props} />
                :(!edit) ?
                    <btnEdit.type {...btnEdit.props} onClick={this.handleEdit}/>
                :<>
                    <btnCheck.type {...btnCheck.props} onClick={this.handleCheck} />
                    <btnCancel.type  {...btnCancel.props} onClick={this.handleCancel} />
                </>}
            </div>
        );
    };
};