import {useAppSelector} from '../../hooks';
import {TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';

function CatalogFilter(): JSX.Element {
  const {isAddToCartModalOpened, isAddReviewModalOpened, isReviewSuccessOpened} = useAppSelector((store) => store);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input tabIndex={getTabIndex()} type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input tabIndex={getTabIndex()} type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input tabIndex={getTabIndex()} className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button tabIndex={getTabIndex()} className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default CatalogFilter;
