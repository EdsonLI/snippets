<?php
# Boilerplate para quando for excluir algum registro solicitando confirmação prévia do usuário com SweetAlertDialogs:
# Exemplo básico:
    public function onDelete($param = null) {
        if(isset($param['delete']) && $param['delete'] == 1) {
            try {
                $key = $param['key'];
                
                TTransaction::open(self::$database);
                $object = new Pessoa($key, FALSE);
                $object->delete();
                TTransaction::close();

                SweetAlertDialogs::showAlert('success', "Fornededor excluído com sucesso!");
                $this->onReload($param);
            } catch (Exception $e) {
                SweetAlertDialogs::showAlert('error', $e->getMessage());
                TTransaction::rollback();
            }
        } else {
            $action = new TAction(array($this, 'onDelete'));
            $action->setParameters($param);
            $action->setParameter('delete', 1);
            
            $params = [
                'title' => 'Deseja realmente excluir o Fornecedor?',
                'text' => 'Esta ação não pode ser desfeita',
                'icon' => 'warning',
                'showCancelButton' => true,
                'confirmButtonText' => 'Sim, continuar',
                'cancelButtonText' => 'Não, cancelar',
            ];
            
            $callback = '
                if (result.isConfirmed) {
                    __adianti_post_data("'.trim($param['class']).'", "class='.trim($param['class']).'&method='.trim($param['method']).'&register_state=false&delete=1&key='.trim($param['key']).'");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    
                }
            ';
            SweetAlertDialogs::showAlertWithCallback($params, $callback);
        }
    }

    # Exemplo avançado:
    public static function onDeleteItemDinabox($param) {
        var_dump('onDeleteItemDinabox $param 4889:::', $param); # die();
        if(isset($param['delete']) && $param['delete'] == 1) {
            try {
                var_dump('opa opa onDeleteItemDinabox 4892:::', $param); die();
                $projectKey = $param['project_id'];
                $itemKey    = $param['key'];
                $orderId    = $param['order_id'] ?? null;
                $itemType   = $param['item_type'] ?? null; # woodworks, components, additionals
                $isEditMode = $orderId ? true : false;
                $sessionKey = $isEditMode ? "order_draft_items_{$orderId}" : 'order_draft_items';

                $erpItems = TSession::getValue($sessionKey) ?? [];

                if (!isset($erpItems[$projectKey]) && $isEditMode) {
                    TTransaction::open(self::$database);
                    $pedido = new PedidoVenda($orderId);
                    $projetosBanco = $pedido->getAgrupamentoProjetos();
                    TTransaction::close();

                    if (isset($projetosBanco[$projectKey])) {
                        $erpItems[$projectKey] = $projetosBanco[$projectKey];
                    } else {
                        throw new Exception('Projeto não encontrado no banco');
                    }
                }

                if (!isset($erpItems[$projectKey])) {
                    throw new Exception('Projeto não encontrado na sessão ou no banco');
                }

                if (!in_array($itemType, ['woodworks', 'components', 'additionals', 'sheets'])) {
                    throw new Exception('Tipo de item inválido para exclusão');
                }

                # Marca como deletado se estiver salvo no banco
                if ($isEditMode && isset($erpItems[$projectKey][$itemType][$itemKey]['id'])) {
                    $deletedSessionKey = "deleted_{$itemType}_{$orderId}";
                    $deletedItems = TSession::getValue($deletedSessionKey) ?? [];

                    if (!isset($deletedItems[$projectKey])) {
                        $deletedItems[$projectKey] = [];
                    }

                    $deletedItems[$projectKey][] = $erpItems[$projectKey][$itemType][$itemKey]['id'];
                    TSession::setValue($deletedSessionKey, $deletedItems);
                }

                unset($erpItems[$projectKey][$itemType][$itemKey]);

                # Faz o recálculo do total do projeto
                $erpItems[$projectKey]['project_price'] = self::calculateProjectTotal($erpItems[$projectKey]);
                TSession::setValue($sessionKey, $erpItems);

                $list = new self(['is_update_row' => 'true']); # acesso à datagrid
                $project = $erpItems[$projectKey];
                $itemId = $project['id'] ?? $project['uuid'];
                $rowId = "row_{$itemId}";

                $object = new stdClass;
                $object->order_id = $orderId ?? null;
                $object->id = $project['id'] ?? null;
                $object->uuid = $project['uuid'] ?? null;
                $object->nome = $project['nome'];
                $object->project_id = $project['project_id'] ?? null;
                $object->total = $project['project_price'];
                $object->item_type = $project['item_type'];
                $object->item_source = $project['item_source'];

                $button = new TElement('button');
                $button->type = 'button';
                $button->class = 'btn-toggle-projetos';
                $button->add('<i class="fas fa-angle-double-up"></i>');
                $button->onclick = "toggleDetail('{$rowId}', this);";
                $object->toggle = $button;

                $row = $list->datagrid_items->addItem($object);
                $row->id = $rowId;
                $row->{'style'} = 'border-top: 2px solid #ccc;';
                $row->add(OrderItemGridRenderer::renderProjectDetailRow($project, $rowId, $itemId, $isEditMode, $orderId));

                TScript::create("$('#datagrid_items').find('tr.row-detail[data-project=\"{$rowId}\"]').remove();");

                TDataGrid::replaceRowById('datagrid_items', $rowId, $row);

                $labels = ['woodworks' => 'Módulo', 'components' => 'Componente', 'additionals' => 'Adicional'];
                $label = $labels[$itemType] ?? 'Item';
            } catch (Exception $e) {
                TTransaction::rollback();
                SweetAlertDialogs::showAlert('error', $e->getMessage(), null);
            }           
        } else {
            $params = [
                'title' => 'Deseja realmente excluir o item?',
                'text' => 'Esta ação não pode ser desfeita!',
                'icon' => 'warning',
                'showCancelButton' => true,
                'confirmButtonText' => 'Sim, continuar',
                'cancelButtonText' => 'Não, cancelar',
            ];

            # Serializa os parâmetros recebidos e adiciona delete=1
            $jsParam = http_build_query(array_merge($param, ['delete' => 1]));
            
            $callback = "
                if (result.isConfirmed) {
                    __adianti_post_data(
                        '{$param['class']}',
                        'class={$param['class']}&method={$param['method']}&{$jsParam}&register_state=false',
                    );
                }
            ";
            SweetAlertDialogs::showAlertWithCallback($params, $callback);
        }            
    }



    