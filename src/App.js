import logo from './circle-cropped.png';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import React from 'react'
import Web3 from 'web3';
import PropTypes from "prop-types";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";
import BigNumber from 'bignumber.js'
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import WalletConnectProvider from "@walletconnect/web3-provider";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SKIDDO_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minTokensBeforeSwap","type":"uint256"}],"name":"MinTokensBeforeSwapUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapAndLiquifyEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"}],"name":"deliver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"geUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeInReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"},{"internalType":"bool","name":"deductTransferFee","type":"bool"}],"name":"reflectionFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidityFee","type":"uint256"}],"name":"setLiquidityFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxTxPercent","type":"uint256"}],"name":"setMaxTxPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"taxFee","type":"uint256"}],"name":"setTaxFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rAmount","type":"uint256"}],"name":"tokenFromReflection","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const PANCAKE_LP_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const PANCAKE_ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const FARM_ABI = [{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_erc20","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"deposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paidOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accERC20PerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]

const styles = {
  root: {
    background: "grey"
  },
  input: {
    color: "white"
  }
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App(props) {
  const {utils: {BN}} = new Web3()
  const [skiddoPrice, setSkiddoPrice] = useState(0)
  const [skiddoReserves, setSkiddoReserves] = useState(null)
  const [approvalAmount, setApprovalAmount] = useState(0)

  const [lpApprovalAmount, setLpApprovalAmount] = useState(0)
  const [lpBalance, setLpBalance] = useState(0)

  const [balance, setBalance] = useState(null)
  const [openLoading, setOpenLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [messageOpen, setMessageOpen] = useState(false)
  const [addSkiddoAmount, setAddSkiddoAmount] = useState(0)
  const [pendingRewards, setPendingRewards] = useState(0)
  const [stakedTokens, setStakedTokens] = useState(0)
  const [wantToStakeAmount, setWantToStakeAmount] = useState('')

  const [addBNBAmount, setAddBNBAmount] = useState(0)
  React.useEffect(()=>{
    
    //get price every 3 second
  },[])
  //infura token: fad40c6991a64c0db19de9420e2ace3f
  //PCS router: 0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F
  //SKIDDO: 0x73d8fd2a7e264b0c19cb981294c0cd11389cc0b8
  //LP: 0x5C3B98c4F97B100cc1a6A67d0bddCf9C43e00a20
  //Approve unlimited = 1000000000000000000000000
  // SKIDDO farm:
  const skiddoFarmAddress = '0x31d0e3D5a03EA6B691941FD1e725cb667586e163'
  const skiddoLPPoolID = 0
  const connectWebSocket = async () => {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        
        56: "https://bsc-dataseed.binance.org/",
      },
      network: 'binance',
      chainId: 56
    });

//  Enable session (triggers QR Code modal)
await provider.enable();
window.web3c = new Web3(provider);
window.account = (await window.web3c.eth.getAccounts())[0]
      window.skiddoToken = new window.web3c.eth.Contract(SKIDDO_ABI, '0x73d8fd2a7e264b0c19cb981294c0cd11389cc0b8')
      window.pcs_lp = new window.web3c.eth.Contract(PANCAKE_LP_ABI, '0x5C3B98c4F97B100cc1a6A67d0bddCf9C43e00a20')
      window.pcs_router = new window.web3c.eth.Contract(PANCAKE_ROUTER_ABI, '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F')
      window.farmer = new window.web3c.eth.Contract(FARM_ABI, skiddoFarmAddress)
      window.skiddo_reserves = await window.pcs_lp.methods.getReserves().call()
      setSkiddoReserves(await window.pcs_lp.methods.getReserves().call())
      setSkiddoPrice((window.skiddo_reserves['1']/1000000000000000000)/(window.skiddo_reserves['0']/1000000000)*1000000)
      const allowance = await window.skiddoToken.methods.allowance(window.account,'0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F').call()
      const lpallowance = await window.pcs_lp.methods.allowance(window.account, skiddoFarmAddress).call()
      const balance = await window.skiddoToken.methods.balanceOf(window.account).call()
      const lpbalance = await window.pcs_lp.methods.balanceOf(window.account).call()
      setLpApprovalAmount(lpallowance)
      setLpBalance(lpbalance)
      setBalance(balance)
      setApprovalAmount(allowance)
      const stakedbal = await window.farmer.methods.deposited(0, window.account).call()
      setStakedTokens(stakedbal)
      const pending = await window.farmer.methods.pending(0, window.account).call()
      setPendingRewards(pending)
      setErrorMessage('Success')
    setMessageOpen(true)
  }
  const connect = async () => {
    if (window.web3) {
      try{
      window.web3c = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      window.account = (await window.web3c.eth.getAccounts())[0]
      window.skiddoToken = new window.web3c.eth.Contract(SKIDDO_ABI, '0x73d8fd2a7e264b0c19cb981294c0cd11389cc0b8')
      window.pcs_lp = new window.web3c.eth.Contract(PANCAKE_LP_ABI, '0x5C3B98c4F97B100cc1a6A67d0bddCf9C43e00a20')
      window.pcs_router = new window.web3c.eth.Contract(PANCAKE_ROUTER_ABI, '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F')
      window.farmer = new window.web3c.eth.Contract(FARM_ABI, skiddoFarmAddress)
      window.skiddo_reserves = await window.pcs_lp.methods.getReserves().call()
      setSkiddoReserves(await window.pcs_lp.methods.getReserves().call())
      setSkiddoPrice((window.skiddo_reserves['1']/1000000000000000000)/(window.skiddo_reserves['0']/1000000000)*1000000)
      const allowance = await window.skiddoToken.methods.allowance(window.account,'0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F').call()
      const lpallowance = await window.pcs_lp.methods.allowance(window.account, skiddoFarmAddress).call()
      const balance = await window.skiddoToken.methods.balanceOf(window.account).call()
      const lpbalance = await window.pcs_lp.methods.balanceOf(window.account).call()
      setLpApprovalAmount(lpallowance)
      setLpBalance(lpbalance)
      setBalance(balance)
      setApprovalAmount(allowance)
      const stakedbal = await window.farmer.methods.deposited(0, window.account).call()
      setStakedTokens(stakedbal)
      const pending = await window.farmer.methods.pending(0, window.account).call()
      setPendingRewards(pending)
      setErrorMessage('Success')
    setMessageOpen(true)
    } catch (e) {
      setErrorMessage('Error: Are you on the correct network? ' + JSON.stringify(e))
      setMessageOpen(true)
    }
    
    setOpenLoading(false)
      return true;
    }
    else if (window.ethereum) {
      setOpenLoading(true)
      try{
        window.account = (await window.ethereum.send('eth_requestAccounts')).result[0];
        window.web3c = new Web3(window.ethereum);
        window.skiddoToken = new window.web3c.eth.Contract(SKIDDO_ABI, '0x73d8fd2a7e264b0c19cb981294c0cd11389cc0b8')
      window.pcs_lp = new window.web3c.eth.Contract(PANCAKE_LP_ABI, '0x5C3B98c4F97B100cc1a6A67d0bddCf9C43e00a20')
      window.pcs_router = new window.web3c.eth.Contract(PANCAKE_ROUTER_ABI, '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F')
      window.farmer = new window.web3c.eth.Contract(FARM_ABI, skiddoFarmAddress)
      window.skiddo_reserves = await window.pcs_lp.methods.getReserves().call()
      setSkiddoReserves(await window.pcs_lp.methods.getReserves().call())
      setSkiddoPrice((window.skiddo_reserves['1']/1000000000000000000)/(window.skiddo_reserves['0']/1000000000)*1000000)
      const allowance = await window.skiddoToken.methods.allowance(window.account,'0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F').call()
      const lpallowance = await window.pcs_lp.methods.allowance(window.account, skiddoFarmAddress).call()
      const balance = await window.skiddoToken.methods.balanceOf(window.account).call()
      const lpbalance = await window.pcs_lp.methods.balanceOf(window.account).call()
      setLpApprovalAmount(lpallowance)
      setLpBalance(lpbalance)
      setBalance(balance)
      setApprovalAmount(allowance)
      const stakedbal = await window.farmer.methods.deposited(0, window.account).call()
      setStakedTokens(stakedbal)
      const pending = await window.farmer.methods.pending(0, window.account).call()
      setPendingRewards(pending)
      setErrorMessage('Success')
      setMessageOpen(true)
      } catch (e) {
        setErrorMessage('Error: Are you on the correct network?' + JSON.stringify(e))
        setMessageOpen(true)
      }
      
      setOpenLoading(false)
      return true;
    } else  {
      try{
connectWebSocket()
      }catch(e){
        setErrorMessage('Error: BSC provider not found')
      setMessageOpen(true)
      }
      
    }
  }
  const approve = async () => {
    setOpenLoading(true)
    try{
      await window.skiddoToken.methods.approve('0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F', '1000000000000000000000000').send({from: window.account})
      const allowance = await window.skiddoToken.methods.allowance(window.account,'0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F').call()
      setApprovalAmount(allowance)
      setErrorMessage('Success')
      setMessageOpen(true)
    } catch(e) {
      setErrorMessage('Error: Approve failed. Do you have enough BNB?')
      setMessageOpen(true)
    }
    
    setOpenLoading(false)
  }
  const approveLP = async () => {
    setOpenLoading(true)
    try{
      await window.pcs_lp.methods.approve(skiddoFarmAddress, '1000000000000000000000000').send({from: window.account})
      const allowance = await window.pcs_lp.methods.allowance(window.account,skiddoFarmAddress).call()
      setLpApprovalAmount(allowance)
      setErrorMessage('Success')
      setMessageOpen(true)
    } catch(e) {
      console.log(e)
      setErrorMessage('Error: Approve failed. Do you have enough BNB?')
      setMessageOpen(true)
    }
    
    setOpenLoading(false)
  }
  const updatePrice = async () => {
    setOpenLoading(true)
    try{
    window.skiddo_reserves = await window.pcs_lp.methods.getReserves().call()
      setSkiddoPrice((window.skiddo_reserves['1']/1000000000000000000)/(window.skiddo_reserves['0']/1000000000)*1000000)
      setSkiddoReserves(await window.pcs_lp.methods.getReserves().call())
      setErrorMessage('Success')
      setMessageOpen(true)
    } catch (e) {
      setErrorMessage('Error: Update price failed. Are you on BSC network?')
      setMessageOpen(true)
    }
      setOpenLoading(false)
  }
  const getPendingRewards = async () => {
    setOpenLoading(true)
    try{
    window.skiddo_reserves = await window.pcs_lp.methods.getReserves().call()
      setSkiddoPrice((window.skiddo_reserves['1']/1000000000000000000)/(window.skiddo_reserves['0']/1000000000)*1000000)
      setSkiddoReserves(await window.pcs_lp.methods.getReserves().call())
      setErrorMessage('Success')
      setMessageOpen(true)
    } catch (e) {
      setErrorMessage('Error: Update price failed. Are you on BSC network?')
      setMessageOpen(true)
    }
      setOpenLoading(false)
  }

  const stake = async () => {
    setOpenLoading(true)
    try{
      console.log(wantToStakeAmount)
      console.log(0, new BigNumber(wantToStakeAmount).multipliedBy(new BigNumber('1000000000000000000')).toFixed(0))
      await window.farmer.methods.deposit(0, new BigNumber(wantToStakeAmount).multipliedBy(new BigNumber('1000000000000000000')).toFixed(0)).send({from: window.account})
      const lpbalance = await window.pcs_lp.methods.balanceOf(window.account).call()
setLpBalance(lpbalance)
const stakedbal = await window.farmer.methods.deposited(0, window.account).call()
      setStakedTokens(stakedbal)
    setErrorMessage('Success')
      setMessageOpen(true)
    } catch (e) {
      console.log(e)
      setErrorMessage('Error: Stake failed. Do you have enough BNB or Cake-LP?')
      setMessageOpen(true)
    }
    setOpenLoading(false)
  }

  const unstake = async () => {
    setOpenLoading(true)
    try{
      await window.farmer.methods.withdraw(0, new BigNumber(wantToStakeAmount).multipliedBy(new BigNumber('1000000000000000000')).toFixed(0)).send({from: window.account})
      const lpbalance = await window.pcs_lp.methods.balanceOf(window.account).call()
setLpBalance(lpbalance)
const stakedbal = await window.farmer.methods.deposited(0, window.account).call()
      setStakedTokens(stakedbal)
    setErrorMessage('Success')
      setMessageOpen(true)
    } catch (e) {
      setErrorMessage('Error: Unstake failed. Do you have enough BNB or Cake-LP?')
      setMessageOpen(true)
    }
    setOpenLoading(false)
  }

  const addLiquidity = async () => {
    setOpenLoading(true)
    try{
      await window.pcs_router.methods.addLiquidityETH('0x73d8fd2a7e264b0c19cb981294c0cd11389cc0b8', new BigNumber(addSkiddoAmount).multipliedBy(new BigNumber('1000000000')).toFixed(0), 0, 0, window.account, '10000000000000000000000000000000000000000').send({from: window.account, value: new BigNumber(addBNBAmount).multipliedBy(new BigNumber('1000000000000000000')).toFixed(0)})
    setErrorMessage('Success')
      setMessageOpen(true)
    } catch (e) {
      setErrorMessage('Error: Add liquidity failed. Do you have enough BNB or SKIDDO?')
      setMessageOpen(true)
    }
    setOpenLoading(false)
    
  }

  const { classes } = props;
  const classes2 = useStyles()

  return (
    <div className="App">
      <Snackbar open={messageOpen} onClose={(r,v)=>{setMessageOpen(false)}} autoHideDuration={3000} >
  <Alert  severity="info">
    {errorMessage}
  </Alert>
</Snackbar>
<h3 onClick={()=>{window.location.href = 'https://successkid.org'}}>{'<'} Back to successkid.org</h3>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Button style={{color:'#C96318', fontWeight: 'bold'}} onClick={connect}>
            Connect Wallet
          </Button>
          <p>Your $SKIDDO holding: {balance ? balance/1000000000 : '?'}</p>
        </div>
        <p>
          <a href='#provision' style={{color: '#C96318', fontWeight: 'bold'}}>Liquidity Provision</a> | <a style={{color: '#C96318', fontWeight: 'bold'}} href='#staking'>LP Staking</a>
        </p>
      </header>
      <div className="App-header" id="provision">
        <div>SKIDDO reserve: {skiddoReserves? skiddoReserves['0']/1000000000:'?'}</div>
        <div>BNB reserve: {skiddoReserves? skiddoReserves['1']/1000000000000000000:'?'}</div>
        <div>SKIDDO price: 1M SKIDDO = {skiddoPrice}BNB</div>
        <Button style={{color:'#C96318', fontWeight: 'bold'}}  onClick={updatePrice}>
            Update Price
          </Button>
        <hr></hr>
        <div  >
          {approvalAmount == 0 ?'Your have to approve first' : 'You have already approved'}
          <br></br>
          <Button style={{color:'#C96318', fontWeight: 'bold'}} disabled={approvalAmount != 0} onClick={approve}>
            Approve
          </Button>
        </div>
        <hr></hr>
        <div>
          {approvalAmount == 0?'After you approve, you can add liquidity. ': 'You have approved. You can add liquidity now. '}You will then receive Cake-LP tokens.
          <br></br>
          <p>Please note that slippage is inevitable.</p>
          <TextField 
          className={classes.root}
          InputProps={{
            className: classes.input
          }}
    color="secondary" disabled={approvalAmount == 0} value={addBNBAmount || 0} onChange={e =>{
      const BNB = e.target.value
      setAddBNBAmount(BNB)
      if (parseFloat(BNB)/parseFloat(skiddoPrice)*1000000 === parseFloat(BNB)/parseFloat(skiddoPrice)*1000000){
        setAddSkiddoAmount((parseFloat(BNB)/parseFloat(skiddoPrice)*1000000).toString())
      }
    }}
          label="BNB input amount" />+ 
          <TextField 
          className={classes.root}
          InputProps={{
            className: classes.input
          }} disabled={approvalAmount == 0} value={addSkiddoAmount || 0} onChange={e =>{
      const skiddo = e.target.value
      setAddSkiddoAmount(skiddo)
      if ((parseFloat(skiddo)*parseFloat(skiddoPrice)/1000000) === (parseFloat(skiddo)*parseFloat(skiddoPrice)/1000000)){
        setAddBNBAmount((parseFloat(skiddo)*parseFloat(skiddoPrice)/1000000).toString())
      }
      
    }}
    color="secondary" label="SKIDDO input amount" />
          
          <Button disabled={approvalAmount == 0} style={{color:'#C96318', fontWeight: 'bold'}} onClick={addLiquidity}>
            Add
          </Button>
        </div>
      </div>
      <div className="App-header" id={"staking"}>
        <div>Staked LP Tokens: {stakedTokens/1000000000000000000}</div>
        <div>LP Token in your wallet: {lpBalance/1000000000000000000}</div><div>SKIDDO reward per block (3 seconds): 12379210</div>
        <hr></hr>
        <Button style={{color:'#C96318', fontWeight: 'bold'}} disabled={lpApprovalAmount != 0} onClick={approveLP}>
            Approve
          </Button>
        <hr></hr>
        <div>
          <div>{lpApprovalAmount==0? 'Please approve before you stake LP tokens' : 'You have approved. You may stake LP tokens now'}</div>
          <Button style={{color:'#C96318', fontWeight: 'bold'}} disabled={lpApprovalAmount == 0} onClick={unstake}>
            - Unstake
          </Button>
          <TextField className={classes.root} onChange={(e) => setWantToStakeAmount(e.target.value)}
          InputProps={{
            className: classes.input
          }} variant="filled"
    color="secondary" label="LP amount" disabled={lpApprovalAmount == 0} />
    <Button style={{color:'#C96318', fontWeight: 'bold'}} disabled={lpApprovalAmount == 0} onClick={stake}>
            Stake +
          </Button></div>
          <hr></hr>
        <div>Pending rewards: {pendingRewards/1000000000} SKIDDO</div>
          <hr>
          </hr>
          <div>Rewards will be claimed on stake and unstake</div>
          {/* <h3>LP Staking is coming soon. Stay tuned.</h3> */}
      </div>
      <Backdrop className={classes2.backdrop} open={openLoading}>
        <CircularProgress color="inherit" />
        <h2>If loading is too long ({'>'}1 min) please refresh the app.</h2>
      </Backdrop>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
