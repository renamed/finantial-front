export class Constants {
    public static BASE_URL = 'http://localhost:5262/api';
    public static CATEGORIES_BASE_URL = `${Constants.BASE_URL}/Categories`;
    public static INSTITUTIONS_BASE_URL = `${Constants.BASE_URL}/Institutions`;
    public static PERIODS_BASE_URL = `${Constants.BASE_URL}/Periods`;
    public static MOVIMENTATIONS_BASE_URL = `${Constants.BASE_URL}/Movimentations`;

    public static DASHBOARD_GROUPBY_CATEGORY_URL = `${Constants.BASE_URL}/Dashboard/categories`;

    public static INVALID_ID = '00000000-0000-0000-0000-000000000000';

    public static SUCCESS_CLASS = 'alert-success';
    public static ERROR_CLASS = 'alert-danger';
}
