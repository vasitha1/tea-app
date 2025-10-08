'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminProductForm from '../../../../../components/admin/AdminProductForm';

const EditProductPage: React.FC = () => {
  const params = useParams();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      setProductId(params.id as string);
    }
  }, [params]);

  if (!productId) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return <AdminProductForm productId={productId} />;
};

export default EditProductPage;
