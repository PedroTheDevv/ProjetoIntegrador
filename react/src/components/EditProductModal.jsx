import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/modal.css';

Modal.setAppElement('#root');

const EditProductModal = ({ isOpen, onRequestClose, product, onSave }) => {
    const [nome, setNome] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (product) {
            setNome(product.nameProduct || '');
            setPrice(product.priceProduct || '');
            setSize(product.sizeProduct || '');
            setDescription(product.descriptionProduct || '');
            setCategory(product.categoryProduct || '');
        }
    }, [product]);

    useEffect(() => {
        setIsFormValid(
            nome && price && size && description && category
        );
    }, [nome, price, size, description, category]);

    const handleSave = () => {
        if (isFormValid) {
            onSave({ ...product,
            nameProduct: nome,
            priceProduct: price,
            sizeProduct: size,
            descriptionProduct: description,
            categoryProduct: category });
            onRequestClose();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <Modal className='modal' isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Editar Produto</h2>
            <form>
                <div>
                    <label>Nome do produto:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do produto"
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Preço do produto"
                    />
                </div>
                <div>
                    <label>Tamanhos disponíveis:</label>
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Tamanhos disponíveis"
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição do produto"
                    />
                </div>
                <div>
                    <label>Categoria:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="Vestido">Vestido</option>
                        <option value="Calça">Calça</option>
                        <option value="Camisa">Camisa</option>
                        <option value="Macacão">Macacão</option>
                    </select>
                </div>
                <button type="button" onClick={handleSave} disabled={!isFormValid}>Salvar</button>
                <button type="button" onClick={onRequestClose}>Cancelar</button>
            </form>
        </Modal>
    );
};

export default EditProductModal;
