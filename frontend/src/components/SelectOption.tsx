import React, { ChangeEvent, Component} from "react";

type Props = {
    dataKey: any;
    value: (string | number);
    options: (string | number)[][];
    stylesClass?: Record<string, string>; 
    onChange: (option: any) => boolean | Promise<boolean>;
};

export class SelectOption extends Component<Props> {
    static defaultProps = {
      orders: [],
    };

    public state: Record<string, any> = {
        loading: false
    }

    private handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({loading: true});
        const { dataKey } = this.props;
        const data = dataKey?{dataKey: e.target.value}:e.target.value;
        await this.props.onChange(data);
        this.setState({loading: false});
    }

    public render() {
        const { options, value, stylesClass} = this.props;
        const { loading } = this.state;
        return (
            <div className={`select ${loading?"is-loading":""}`}>
                <select onChange={this.handleChange}
                    defaultValue={value}
                    className={stylesClass && stylesClass[value]}>

                    { options.map((o, idx) => 
                        <option 
                            key={idx}
                            value={o[0]}
                            label={String(o[1])}
                        />
                    )}
                </select>
            </div>
        )};
}

