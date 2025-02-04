import pandas as pd
import altair as alt
import streamlit as st


def analyze_transactions(csv_file):
    """
    Analyzes transaction data to count successful and unsuccessful transactions.

    Args:
        csv_file: The path to the CSV file containing the transaction data.
    """

    try:
        df = pd.read_csv(csv_file)
        print(df.head())

        st.subheader("Successful transactions rates")

        # Overall success rate
        overall_success_rate = df['status'].mean() * 100
        print(f"Overall Success Rate: {overall_success_rate:.2f}%")
        st.write(f"Overall Success Rate: {overall_success_rate:.2f}%")


        # Success rate by strategy
        success_rate_by_strategy = df.groupby('strategy')['status'].mean() * 100

        # Create a DataFrame for the chart
        chart_data = pd.DataFrame({
            'Strategy': success_rate_by_strategy.index,
            'Success Rate': success_rate_by_strategy.values
        })

        # Create the Altair chart
        chart = alt.Chart(chart_data).mark_bar().encode(
            x=alt.X('Strategy', title='Strategy'),
            y=alt.Y('Success Rate', title='Success Rate (%)'),
            tooltip=['Strategy', 'Success Rate']
        ).properties(
            title='Success Rate by Strategy'
        )

        # Display the chart in Streamlit
        st.altair_chart(chart, use_container_width=True)


        # Success rate over time (daily)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        success_rate_over_time = df.groupby(df['timestamp'].dt.date)['status'].mean() * 100
        print(f'success_rate_over_time :>> {success_rate_over_time}')

        # Create a DataFrame for the chart
        chart_data = pd.DataFrame({
            'Date': success_rate_over_time.index,
            'Success Rate': success_rate_over_time.values
        })
        print(f'chart_data :>> {chart_data}')

        # Create the Altair chart
        chart = alt.Chart(chart_data).mark_line(point=True).encode(
            x=alt.X('Date', title='Date'),
            y=alt.Y('Success Rate', title='Success Rate (%)'),
            tooltip=['Date', 'Success Rate']
        ).properties(
            title='Success Rate Over Time (Daily)'
        )
        st.altair_chart(chart, use_container_width=True)

        st.subheader("Strategy Analysis")  # Add a subheader for this section
        # col1, col2, col3 = st.columns(3)  # Create three columns

        # Strategy Analysis
        strategy_counts = df['strategy'].value_counts()
        print("\nStrategy Counts:")
        print(strategy_counts)
        # st.write("\nStrategy Counts:")
        # st.write(strategy_counts)        

        # Calculate percentage for each strategy
        strategy_percentages = (strategy_counts / strategy_counts.sum()) * 100  
        print("\nStrategy Percentages:")
        print(strategy_percentages)
        # st.write("\nStrategy Percentages:")
        # st.write(strategy_percentages)        

        # Create a DataFrame for the pie chart
        chart_data = pd.DataFrame({
            'Strategy': strategy_counts.index,
            'Count': strategy_counts.values
        })

        # Create the Altair pie chart
        base = alt.Chart(chart_data).encode(
            theta=alt.Theta("Count", stack=True)
        )

        pie = base.mark_arc(outerRadius=120).encode(
            color=alt.Color("Strategy"),
            order=alt.Order("Count", sort="descending"),
            tooltip=["Strategy", "Count"]
        )
        text = base.mark_text(radius=140).encode(
            text=alt.Text("Count"),
            order=alt.Order("Count", sort="descending"),
            color=alt.value("black")  # Set the color of the labels to black
        )

        chart = pie + text

        # Add chart title
        chart = chart.properties(
            title='Tx count by strategy'
        )

        # Display the chart in Streamlit
        st.altair_chart(chart, use_container_width=True)
        
      # Daily dynamics for strategy 0x0000000000000000000000000000000000000000
        df['timestamp'] = pd.to_datetime(df['timestamp'])

        # Calculate daily counts for all strategies and 0x0 strategy
        daily_counts_all = df.groupby(df['timestamp'].dt.date).size().cumsum()
        daily_counts_0x0 = df[df['strategy'] == '0x0000000000000000000000000000000000000000'].groupby(df['timestamp'].dt.date).size().cumsum()

        # Create a DataFrame for the chart
        chart_data = pd.DataFrame({
            'Date': daily_counts_all.index,
            'Total Transactions': daily_counts_all.values,
            '0x0 Transactions': daily_counts_0x0.values
        })

        # Melt the DataFrame to long format for Altair
        chart_data = pd.melt(chart_data, id_vars=['Date'], value_vars=['Total Transactions', '0x0 Transactions'], var_name='Transaction Type', value_name='Count')

        # Create the Altair chart with two lines
        chart = alt.Chart(chart_data).mark_line(point=True).encode(
            x=alt.X('Date', title='Date'),
            y=alt.Y('Count', title='Cumulative Transaction Count'),
            color='Transaction Type',
            tooltip=['Date', 'Transaction Type', 'Count']
        ).properties(
            title='Cumulative Daily Transaction Counts'
        )

        # Display the chart in Streamlit
        st.altair_chart(chart, use_container_width=True)

    except FileNotFoundError:
        print(f"File not found: {csv_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

def create_transaction_volume_table(data_file, num_bins=10):
    """
    Creates a table of transaction counts for different volume ranges.

    Args:
        data_file: Path to the CSV file containing transaction data.
        num_bins: The desired number of bins for grouping volumes.
    
    Returns:
        A pandas DataFrame representing the table.
    """

    try:
        df = pd.read_csv(data_file)

        total_transactions = len(df)
        print(f"Total Onramps: {total_transactions}")

        total_volume = df['output_value_sat'].sum()
        print(f"Total Volume: {total_volume} (output_value_sat)")

        # Display total transactions and total volume prominently
        st.header("Transaction Overview")
        col1, col2 = st.columns(2)
        col1.metric("Total Onramps", total_transactions)
        col2.metric("Total Volume (output_value_sat)", total_volume)

        # Determine lower and upper bounds
        lower_bound = 0
        upper_bound = 300000
        # lower_bound = df['output_value_sat'].min()
        # upper_bound = df['output_value_sat'].max()        

        # Create bins for `output_value_sat`
        bins = pd.interval_range(start=lower_bound, end=upper_bound, periods=num_bins, closed='left')
        df['volume_bin'] = pd.cut(df['output_value_sat'], bins=bins)

        # Count transactions in each bin
        volume_counts = df.groupby('volume_bin').size().reset_index(name='transaction_count')

        # Add a row for transactions above the upper bound
        above_upper_bound_count = df['output_value_sat'][df['output_value_sat'] > upper_bound].count()
        above_upper_bound_row = pd.DataFrame({'volume_bin': [f'Above {upper_bound}'], 'transaction_count': [above_upper_bound_count]})
        volume_counts = pd.concat([volume_counts, above_upper_bound_row], ignore_index=True)
        # print(volume_counts.to_markdown(index=False, numalign="left", stralign="left"))

        # Create the Altair bar chart
        chart = alt.Chart(volume_counts).mark_bar().encode(
            x=alt.X('volume_bin', title='Volume Range', sort=None),
            y=alt.Y('transaction_count', title='Transaction Count'),
            # tooltip=['volume_bin', 'transaction_count']
        ).properties(
            title='Transaction Volume Distribution'
        )

        # Display the chart in Streamlit
        st.altair_chart(chart, use_container_width=True)        

        # Transaction count by gateway
        tx_count_by_gateway = df.groupby('contract_address').size().reset_index(name='transaction_count')
        tx_count_by_gateway['percentage'] = (tx_count_by_gateway['transaction_count'] / tx_count_by_gateway['transaction_count'].sum()) * 100
        print(tx_count_by_gateway)

        # Transaction volume by gateway
        tx_volume_by_gateway = df.groupby('contract_address')['output_value_sat'].sum().reset_index(name='transaction_volume')
        tx_volume_by_gateway['percentage'] = (tx_volume_by_gateway['transaction_volume'] / tx_volume_by_gateway['transaction_volume'].sum()) * 100

        print(tx_volume_by_gateway)

  # Create two columns for the pie charts
        col1, col2 = st.columns(2)

        # Pie chart for transaction count by gateway
        with col1:
            base = alt.Chart(tx_count_by_gateway).encode(
                theta=alt.Theta("transaction_count", stack=True)
            )
            pie = base.mark_arc(outerRadius=70).encode(
                color=alt.Color("contract_address"),
                order=alt.Order("transaction_count", sort="descending"),
                tooltip=["contract_address", "transaction_count"]
            )
            text = base.mark_text(radius=140).encode(
                text=alt.Text("percentage", format=".1%"),
                order=alt.Order("transaction_count", sort="descending"),
                color=alt.value("black")
            )
            chart = pie + text
            st.altair_chart(chart.properties(title='Transaction Count by Gateway'), use_container_width=True)

        # Pie chart for transaction volume by gateway
        with col2:
            base = alt.Chart(tx_volume_by_gateway).encode(
                theta=alt.Theta("transaction_volume", stack=True)
            )
            pie = base.mark_arc(outerRadius=70).encode(
                color=alt.Color("contract_address"),
                order=alt.Order("transaction_volume", sort="descending"),
                tooltip=["contract_address", "transaction_volume"]
            )
            text = base.mark_text(radius=140).encode(
                text=alt.Text("percentage", format=".1%"),
                order=alt.Order("transaction_volume", sort="descending"),
                color=alt.value("black")
            )
            chart = pie + text
            st.altair_chart(chart.properties(title='Transaction Volume by Gateway'), use_container_width=True)

        # # Daily transaction count and volume
        # df['timestamp'] = pd.to_datetime(df['timestamp'])
        # daily_stats = df.groupby(df['timestamp'].dt.date).agg(
        #     transaction_count=('tx_id', 'count'),
        #     transaction_volume=('output_value_sat', 'sum')
        # ).reset_index()
        # print(daily_stats)

        # Transactions per user
        transactions_per_user = df['recipient'].value_counts()
        print(transactions_per_user)


        # Create bins for transaction counts per user
        bins = [1, 2, 5, 10, float('inf')]
        labels = ['1', '2-5', '5-10', 'Above 10']
        user_tx_counts = pd.cut(transactions_per_user, bins=bins, labels=labels, right=False).value_counts().sort_index()

        # Convert to DataFrame for Altair
        chart_data = pd.DataFrame({
            'Transaction Count Range': user_tx_counts.index,
            'User Count': user_tx_counts.values
        })

        # Create the Altair bar chart
        chart = alt.Chart(chart_data).mark_bar().encode(
            x=alt.X('Transaction Count Range', title='Transaction Count Range'),
            y=alt.Y('User Count', title='Number of Users'),
            tooltip=['Transaction Count Range', 'User Count']
        ).properties(
            title='Distribution of Users by Transaction Count'
        )

        # Display the chart in Streamlit
        st.altair_chart(chart, use_container_width=True)

        # Percentage of users with only one transaction
        single_tx_user_percentage = (transactions_per_user == 1).mean() * 100
        print(f'single_tx_user_percentage :>> {single_tx_user_percentage}')

        df['timestamp'] = pd.to_datetime(df['timestamp'])

       # Time between interactions (using a loop)
        time_diffs_1_2 = [] # Store time differences between 1st and 2nd interactions
        time_diffs_2_3 = [] # Store time differences between 2nd and 3rd interactions

        for recipient, group in df.sort_values(['recipient', 'timestamp']).groupby('recipient'):
            if len(group) > 1:
                # print(group)
                for i in range(1, len(group)):
                    if i == 1:
                        time_diff = group['timestamp'].iloc[i] - group['timestamp'].iloc[i - 1]
                        time_diffs_1_2.append(time_diff)  # Add to the list for 1st and 2nd

                    if i == 2:  # Only calculate for 2nd and 3rd if there's a 3rd interaction
                        time_diffs_2_3.append(time_diff)  # Add to the list for 2nd and 3rd

        # # Calculate and print statistics for time between 1st and 2nd
        # if time_diffs_1_2:
        #     time_diff_series_1_2 = pd.Series(time_diffs_1_2)
        #     median_time_diff_1_2 = time_diff_series_1_2.median()
        #     percentile_5th_1_2 = time_diff_series_1_2.quantile(0.05)
        #     percentile_95th_1_2 = time_diff_series_1_2.quantile(0.95)

        #     print("\nTime between 1st and 2nd interaction:")
        #     print(f"Median: {median_time_diff_1_2}")
        #     print(f"5th percentile: {percentile_5th_1_2}")
        #     print(f"95th percentile: {percentile_95th_1_2}")

        # # Calculate and print statistics for time between 2nd and 3rd
        # if time_diffs_2_3:
        #     time_diff_series_2_3 = pd.Series(time_diffs_2_3)
        #     median_time_diff_2_3 = time_diff_series_2_3.median()
        #     percentile_5th_2_3 = time_diff_series_2_3.quantile(0.05)
        #     percentile_95th_2_3 = time_diff_series_2_3.quantile(0.95)

        #     print("\nTime between 2nd and 3rd interaction:")
        #     print(f"Median: {median_time_diff_2_3}")
        #     print(f"5th percentile: {percentile_5th_2_3}")
        #     print(f"95th percentile: {percentile_95th_2_3}")

        # print(df.sort_values(['recipient', 'timestamp']).groupby('recipient'))

        # Create two columns for the statistics
        col1, col2 = st.columns(2)

        # 1st and 2nd interaction statistics
        with col1:
            st.subheader("Time between 1st and 2nd Interaction")
            if time_diffs_1_2:
                time_diff_series_1_2 = pd.Series(time_diffs_1_2)
                median_time_diff_1_2 = time_diff_series_1_2.median()
                percentile_5th_1_2 = time_diff_series_1_2.quantile(0.05)
                percentile_95th_1_2 = time_diff_series_1_2.quantile(0.95)

                st.write(f"Median: {median_time_diff_1_2}")
                st.write(f"5th percentile: {percentile_5th_1_2}")
                st.write(f"95th percentile: {percentile_95th_1_2}")
            else:
                st.write("No data available")

        # 2nd and 3rd interaction statistics
        with col2:
            st.subheader("Time between 2nd and 3rd Interaction")
            if time_diffs_2_3:
                time_diff_series_2_3 = pd.Series(time_diffs_2_3)
                median_time_diff_2_3 = time_diff_series_2_3.median()
                percentile_5th_2_3 = time_diff_series_2_3.quantile(0.05)
                percentile_95th_2_3 = time_diff_series_2_3.quantile(0.95)

                st.write(f"Median: {median_time_diff_2_3}")
                st.write(f"5th percentile: {percentile_5th_2_3}")
                st.write(f"95th percentile: {percentile_95th_2_3}")
            else:
                st.write("No data available")





        # # Volume difference between 1st and 2nd interaction
        volume_diffs_percent = []
        for recipient, group in df.sort_values(['recipient', 'timestamp']).groupby('recipient'):
            if len(group) > 1:
                first_volume = group['output_value_sat'].iloc[0]
                second_volume = group['output_value_sat'].iloc[1]
                volume_diff_percent = ((second_volume - first_volume) / first_volume) * 100
                volume_diffs_percent.append(volume_diff_percent)

        # if volume_diffs_percent:
        #     volume_diffs_series = pd.Series(volume_diffs_percent)
        #     median_volume_diff = volume_diffs_series.median()
        #     percentile_5th_volume = volume_diffs_series.quantile(0.05)
        #     percentile_95th_volume = volume_diffs_series.quantile(0.95)

        #     print("\nVolume difference between 1st and 2nd interaction:")
        #     print(f"Median: {median_volume_diff:.2f}%")
        #     print(f"5th percentile: {percentile_5th_volume:.2f}%")
        #     print(f"95th percentile: {percentile_95th_volume:.2f}%")

        # Display volume difference statistics
        st.subheader("Volume Difference between 1st and 2nd Interaction")
        if volume_diffs_percent:
            volume_diffs_series = pd.Series(volume_diffs_percent)
            median_volume_diff = volume_diffs_series.median()
            percentile_5th_volume = volume_diffs_series.quantile(0.05)
            percentile_95th_volume = volume_diffs_series.quantile(0.95)

            st.write(f"Median: {median_volume_diff:.2f}%")
            st.write(f"5th percentile: {percentile_5th_volume:.2f}%")
            st.write(f"95th percentile: {percentile_95th_volume:.2f}%")
        else:
            st.write("No data available")

    except FileNotFoundError:
        print(f"File not found: {data_file}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
if __name__ == "__main__":
    st.title("BOB Dashboard")
    # Part 1: Gateway Registry Transactions Stats
    st.header("1. Gateway Registry Transactions Stats")    
    transactions_file = './aggregated/GWRProveBtcTransfer.csv'
    analyze_transactions(transactions_file)

    # Part 2: Onramp Logs Stats
    st.header("2. Onramp Logs Stats")
    histogram_data_file = './aggregated/Onramp.csv'
    create_transaction_volume_table(histogram_data_file, num_bins=55)  
        
