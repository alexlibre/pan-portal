import '../lib/fias-api/core';
import '../lib/fias-api/fias';
import '../lib/fias-api/style.css';

const initKladr = () => {
    (function () {
        var $container = $(document.querySelector('.js-form-address'));
    
        var $city = $container.find('[name="city"]'),
            $street = $container.find('[name="street"]'),
            $building = $container.find('[name="building"]');
        $()
            .add($city)
            .add($street)
            .add($building)
            .fias({
                parentInput: $container,
                verify: false,
            });
    
        $city.fias('type', $.fias.type.city);
        $street.fias('type', $.fias.type.street);
        $building.fias('type', $.fias.type.building);
    
        // $city.fias('withParents', true);
        // $street.fias('withParents', true);

    })();
}

export default initKladr;
