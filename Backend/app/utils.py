import os


def get_env_var_setting(env_var_name, default_value):
    try:
        env_var_value = os.environ[env_var_name]
    except:
        env_var_value = default_value
    return env_var_value
