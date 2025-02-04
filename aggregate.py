import os
import pandas as pd
import glob

def aggregate_data(root_folder):
    """
    Aggregates data from multiple subfolders into four CSV files.

    Args:
        root_folder: The path to the root folder containing the subfolders.
    """

    subfolders = sorted(glob.glob(os.path.join(root_folder, '*')))  # Get sorted list of subfolders
    csv_files = ['DepositERC.csv', 'Onramp.csv', 'WithdrawERC.csv', 'WithdrawETH.csv', 'GWRProveBtcTransfer.csv']

    for csv_file in csv_files:
        all_dfs = []
        for subfolder in subfolders:
            file_path = os.path.join(subfolder, csv_file)
            if os.path.exists(file_path):
                try:
                    df = pd.read_csv(file_path)
                    all_dfs.append(df)
                except pd.errors.EmptyDataError:
                    print(f"Skipping empty file: {file_path}")
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

        if all_dfs:
            combined_df = pd.concat(all_dfs, ignore_index=True)
            combined_df.to_csv('./aggregated/' + csv_file, index=False)  # Save combined data to a new CSV
            print(f"Aggregated data saved to {csv_file}")


if __name__ == "__main__":
    root_folder = './data'  # Replace with the actual path to your root folder
    aggregate_data(root_folder)