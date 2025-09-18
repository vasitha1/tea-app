import React from 'react';
import AdminProductForm from '@/components/admin/AdminProductForm';

interface EditProductPageProps {
  params: { id: string };
}

const EditProductPage: React.FC<EditProductPageProps> = ({ params }) => {
  const productId = parseInt(params.id);

  return <AdminProductForm productId={productId} />;
};

export default EditProductPage;
