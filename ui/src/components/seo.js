// import Head from 'next/head';
import PropTypes from 'prop-types';

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title ? title + ' | Devias Kit PRO' : 'Devias Kit PRO';

  return (
    <header>
      <title>{fullTitle}</title>
    </header>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};