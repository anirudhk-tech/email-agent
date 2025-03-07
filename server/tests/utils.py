import builtins

original_open = builtins.open

def mock_open_file(file, file_to_test='', mode='r', *args, **kwargs):
    if file.endswith(file_to_test):
        raise FileNotFoundError
    else:
        return original_open(file, mode, *args, **kwargs)